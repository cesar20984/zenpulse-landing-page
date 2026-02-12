import prisma from '@/lib/prisma';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Initialize Mercado Pago
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || ''
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            firstName,
            lastName,
            email,
            phone,
            streetAddress,
            comuna,
            instructions,
            packageContents,
            packagePieces,
            siteId
        } = body;

        // 0. Basic Validation
        if (!firstName || !lastName || !phone || !streetAddress || !comuna) {
            return NextResponse.json(
                { success: false, error: 'Faltan campos obligatorios' },
                { status: 400 }
            );
        }

        // 1. Create or Update Customer
        // Upsert by phone (and email if provided)
        const customer = await prisma.customer.upsert({
            where: { phone: phone },
            update: {
                firstName,
                lastName,
                email: email || undefined,
            },
            create: {
                firstName,
                lastName,
                email: email || null,
                phone,
            },
        });

        // 2. Create Address
        const address = await prisma.address.create({
            data: {
                customerId: customer.id,
                streetAddress,
                comuna,
                instructions,
            },
        });

        // 3. Create Order
        const order = await prisma.order.create({
            data: {
                customerId: customer.id,
                addressId: address.id,
                siteId: siteId || 'zenpulse-chile',
                packageContents: packageContents || 'ZenPulse Device',
                packagePieces: parseInt(packagePieces) || 1,
                paymentStatus: 'pending',
                fulfillmentStatus: 'new',
                orderNumber: new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14),
            },
        });

        // 4. Create Mercado Pago Preference
        const preference = new Preference(client);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const preferenceResult = await preference.create({
            body: {
                items: [
                    {
                        id: order.id,
                        title: order.packageContents,
                        unit_price: 19990,
                        quantity: 1,
                        currency_id: 'CLP',
                    }
                ],
                back_urls: {
                    success: `${baseUrl}/payment/success`,
                    failure: `${baseUrl}/payment/failure`,
                    pending: `${baseUrl}/payment/pending`,
                },
                auto_return: 'approved',
                external_reference: order.orderNumber || order.id,
                notification_url: `${baseUrl}/api/webhooks/mercadopago`,
            }
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.orderNumber,
            initPoint: preferenceResult.init_point
        });

    } catch (error: any) {
        console.error('Checkout Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Error al procesar el checkout' },
            { status: 500 }
        );
    }
}
