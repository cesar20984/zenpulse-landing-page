import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const token = req.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, body: customMessage } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Missing order id' }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                customer: true,
                address: true
            }
        });

        if (!order || !order.customer.email) {
            return NextResponse.json({ error: 'Order or customer email not found' }, { status: 404 });
        }

        // Send manual email
        const success = await sendEmail('manual-email', order.customer.email, {
            customer_name: order.customer.firstName,
            order_number: order.orderNumber || order.id.slice(0, 8),
            message: customMessage
        });

        return NextResponse.json({ success });
    } catch (error: any) {
        console.error('Send Manual Email Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
