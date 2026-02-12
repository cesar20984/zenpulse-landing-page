import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Idempotency check using providerPaymentId
        const { providerPaymentId, orderId, status, amount, provider } = body;

        if (!providerPaymentId || !orderId) {
            return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
        }

        // Upsert payment
        const payment = await prisma.payment.upsert({
            where: { providerPaymentId },
            update: {
                status: status as any,
            },
            create: {
                orderId,
                provider,
                providerPaymentId,
                status: status as any,
                amount,
            },
        });

        // Update order status if approved
        if (status === 'approved') {
            await prisma.order.update({
                where: { id: orderId },
                data: { paymentStatus: 'paid' },
            });
        } else if (status === 'rejected') {
            await prisma.order.update({
                where: { id: orderId },
                data: { paymentStatus: 'rejected' },
            });
        }

        return NextResponse.json({ success: true, paymentId: payment.id });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Error en el webhook' }, { status: 500 });
    }
}
