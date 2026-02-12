import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
        });

        return NextResponse.json({ success: true, order: updatedOrder });
    } catch (error: any) {
        console.error('Update Order Status Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
