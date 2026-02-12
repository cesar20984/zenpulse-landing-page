import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
                orderNumber: `ZP-${Math.floor(100000 + Math.random() * 900000)}`,
            },
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.orderNumber
        });

    } catch (error: any) {
        console.error('Checkout Error:', error);
        return NextResponse.json(
            { success: false, error: 'Error al procesar el checkout' },
            { status: 500 }
        );
    }
}
