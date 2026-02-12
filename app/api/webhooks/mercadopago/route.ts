import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || ''
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { searchParams } = new URL(req.url);
        const type = body.type || searchParams.get('topic');
        const dataId = body.data?.id || searchParams.get('id');

        if (type === 'payment') {
            const paymentClient = new Payment(client);
            const payment = await paymentClient.get({ id: dataId });

            const orderNumber = payment.external_reference;
            const status = payment.status;

            if (orderNumber) {
                // Determine order status based on MP status
                let paymentStatus: 'pending' | 'paid' | 'rejected' = 'pending';
                if (status === 'approved') paymentStatus = 'paid';
                if (status === 'rejected' || status === 'cancelled') paymentStatus = 'rejected';

                await prisma.order.update({
                    where: { orderNumber: orderNumber },
                    data: { paymentStatus: paymentStatus }
                });

                // Record payment detail
                await prisma.payment.upsert({
                    where: { providerPaymentId: dataId.toString() },
                    update: { status: status as any },
                    create: {
                        orderId: (await prisma.order.findUnique({ where: { orderNumber: orderNumber } }))?.id || '',
                        provider: 'mercadopago',
                        providerPaymentId: dataId.toString(),
                        status: status as any,
                        amount: payment.transaction_amount || 0
                    }
                });
            }
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Mercado Pago Webhook Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
