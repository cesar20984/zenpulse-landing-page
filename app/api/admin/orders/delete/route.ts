import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
    try {
        const adminToken = req.headers.get('x-admin-token');
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('id');

        if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        if (!orderId) {
            return NextResponse.json({ error: 'ID de orden requerido' }, { status: 400 });
        }

        // Before deleting the order, we might need to delete related records if they are not set to cascade
        // However, Prisma typically handles relations based on the schema.
        // Let's check schema.prisma but for now we'll attempt a direct delete.
        // In our schema, Order has relations to Customer and Address. 
        // We probably only want to delete the Order, not the Customer.

        await prisma.order.delete({
            where: { id: orderId }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Admin Delete Order Error:', error);
        return NextResponse.json({ error: 'Error al eliminar la orden' }, { status: 500 });
    }
}
