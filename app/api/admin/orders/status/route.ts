import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

import { sendEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const token = req.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { fulfillmentStatus: status },
            include: {
                customer: true,
                address: true
            }
        });

        // Trigger email if marked as shipped
        if (status === 'shipped' && updatedOrder.customer.email) {
            await sendEmail('order-shipped', updatedOrder.customer.email, {
                customer_name: updatedOrder.customer.firstName,
                order_number: updatedOrder.orderNumber || updatedOrder.id.slice(0, 8),
                shipping_address: updatedOrder.address.streetAddress,
                comuna: updatedOrder.address.comuna
            });
        }

        return NextResponse.json({ success: true, order: updatedOrder });
    } catch (error: any) {
        console.error('Update Order Status Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
