import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || ''
});

import { sendEmail } from '@/lib/mail';

export async function POST(req: Request) {
    console.log('--- Mercado Pago Webhook Received ---');
    try {
        const body = await req.json();
        console.log('Webhook Body:', JSON.stringify(body, null, 2));

        const { searchParams } = new URL(req.url);
        const type = body.type || searchParams.get('topic');
        const dataId = body.data?.id || searchParams.get('id');

        // Handle MP Simulator/Test IDs
        if (dataId === '123456') {
            console.log('Simulation detected (ID 123456). Returning 200 OK.');
            return NextResponse.json({ received: true, simulation: true });
        }

        if (type === 'payment' && dataId) {
            try {
                const paymentClient = new Payment(client);
                const payment = await paymentClient.get({ id: dataId });

                const orderNumber = payment.external_reference;
                const status = payment.status;

                console.log(`Payment ${dataId} for Order ${orderNumber} is ${status}`);

                if (orderNumber) {
                    const order = await prisma.order.findUnique({
                        where: { orderNumber: orderNumber },
                        include: {
                            customer: true,
                            address: true
                        }
                    });

                    if (order) {
                        // Determine order status based on MP status
                        let paymentStatus: 'pending' | 'paid' | 'rejected' | 'refunded' | 'charged_back' = 'pending';
                        const isFirstApproval = status === 'approved' && order.paymentStatus !== 'paid';

                        if (status === 'approved') paymentStatus = 'paid';
                        if (status === 'refunded') paymentStatus = 'refunded';
                        if (status === 'charged_back') paymentStatus = 'charged_back';
                        if (status === 'rejected' || status === 'cancelled') paymentStatus = 'rejected';

                        await prisma.order.update({
                            where: { id: order.id },
                            data: { paymentStatus: paymentStatus }
                        });

                        // Record payment detail
                        await prisma.payment.upsert({
                            where: { providerPaymentId: dataId.toString() },
                            update: { status: status as any },
                            create: {
                                orderId: order.id,
                                provider: 'mercadopago',
                                providerPaymentId: dataId.toString(),
                                status: status as any,
                                amount: payment.transaction_amount || 0
                            }
                        });

                        // Send Notifications and Update Inventory on Initial Approval
                        if (isFirstApproval) {
                            // 1. Update Inventory
                            const stockSetting = await prisma.globalSetting.findUnique({
                                where: { key: 'product_inventory' }
                            });

                            let currentStock = parseInt(stockSetting?.value || '0');
                            if (currentStock > 0) {
                                const newStock = currentStock - (order.packagePieces || 1);
                                await prisma.globalSetting.update({
                                    where: { key: 'product_inventory' },
                                    data: { value: Math.max(0, newStock).toString() }
                                });

                                // 2. Notify Admin if Stock is Low (Exactly 1 remains)
                                if (newStock === 1) {
                                    const adminEmail = process.env.ADMIN_EMAIL || 'cesar@zenpulse.cl';
                                    const productNameSetting = await prisma.globalSetting.findUnique({
                                        where: { key: 'product_name' }
                                    });
                                    const productName = productNameSetting?.value || 'ZenPulse';

                                    await sendEmail('admin-low-stock', adminEmail, {
                                        product_name: productName,
                                        admin_url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin`
                                    }).catch(err => console.error('Error sending low stock email:', err));
                                }
                            }

                            // 3. To Customer
                            if (order.customer.email) {
                                await sendEmail('purchase-confirmation', order.customer.email, {
                                    customer_name: order.customer.firstName,
                                    order_number: order.orderNumber || order.id.slice(0, 8),
                                    product_name: order.packageContents,
                                    shipping_address: order.address.streetAddress,
                                    comuna: order.address.comuna
                                });
                            }

                            // 4. To Admin (New Order)
                            const adminEmail = process.env.ADMIN_EMAIL || 'cesar@zenpulse.cl';
                            await sendEmail('admin-new-order', adminEmail, {
                                customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
                                order_number: order.orderNumber || order.id.slice(0, 8),
                                amount: `$${payment.transaction_amount?.toLocaleString('es-CL')}`,
                                comuna: order.address.comuna,
                                shipping_address: order.address.streetAddress,
                                admin_url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin`
                            });
                        }

                        console.log(`Order ${orderNumber} updated successfully.`);
                    } else {
                        console.warn(`Order ${orderNumber} not found in database. Skipping update.`);
                    }
                }
            } catch (mpError: any) {
                console.error('Error fetching payment from MP:', mpError.message);
                // Return 200 even if MP call fails for a specific ID to avoid MP retrying endlessly
                return NextResponse.json({ received: true, error: 'MP payment not found' });
            }
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Mercado Pago Webhook Global Error:', error);
        // Even on global error, we return 200 to acknowledge receipt if we parsed the body
        return NextResponse.json({ success: false, error: error.message }, { status: 200 });
    }
}
