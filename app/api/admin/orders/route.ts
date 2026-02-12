import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const adminToken = req.headers.get('x-admin-token');

        if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            take: 100,
            orderBy: { createdAt: 'desc' },
            include: {
                customer: true,
                address: true,
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Admin Orders Error:', error);
        return NextResponse.json({ error: 'Error al obtener las órdenes' }, { status: 500 });
    }
}
