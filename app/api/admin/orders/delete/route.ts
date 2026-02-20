import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
    try {
        const adminToken = req.headers.get('x-admin-token');
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('id');
        const bulk = searchParams.get('bulk');

        if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        // Bulk delete all archived orders
        if (bulk === 'archived') {
            await prisma.order.deleteMany({
                where: { isArchived: true }
            });
            return NextResponse.json({ success: true, message: 'Archivo vaciado' });
        }

        if (!orderId) {
            return NextResponse.json({ error: 'ID de orden requerido' }, { status: 400 });
        }

        // Check current status
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 });
        }

        if (order.isArchived) {
            // Already archived -> Hard delete
            await prisma.order.delete({
                where: { id: orderId }
            });
            return NextResponse.json({ success: true, message: 'Orden eliminada permanentemente' });
        } else {
            // Not archived -> Soft delete (Archive)
            await prisma.order.update({
                where: { id: orderId },
                data: { isArchived: true }
            });
            return NextResponse.json({ success: true, message: 'Orden movida al archivo' });
        }
    } catch (error: any) {
        console.error('Admin Delete Order Error:', error);
        return NextResponse.json({ error: 'Error al eliminar la orden' }, { status: 500 });
    }
}
