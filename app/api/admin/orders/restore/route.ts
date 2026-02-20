import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const adminToken = req.headers.get('x-admin-token');
        const { ids } = await req.json();

        if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ error: 'Lista de IDs requerida' }, { status: 400 });
        }

        await prisma.order.updateMany({
            where: {
                id: { in: ids }
            },
            data: {
                isArchived: false
            }
        });

        return NextResponse.json({ success: true, message: 'Órdenes restauradas con éxito' });
    } catch (error: any) {
        console.error('Admin Restore Orders Error:', error);
        return NextResponse.json({ error: 'Error al restaurar las órdenes' }, { status: 500 });
    }
}
