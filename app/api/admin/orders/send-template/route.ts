import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const token = req.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { orderId, templateSlug } = await req.json();

        if (!orderId || !templateSlug) {
            return NextResponse.json({ error: 'Missing orderId or templateSlug' }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                customer: true,
                address: true
            }
        });

        if (!order || !order.customer.email) {
            return NextResponse.json({ error: 'Order or customer email not found' }, { status: 404 });
        }

        // Prepare variables based on template needs
        const variables: Record<string, string> = {
            customer_name: order.customer.firstName,
            order_number: order.orderNumber || order.id.slice(0, 8),
            product_name: order.packageContents,
            shipping_address: order.address.streetAddress,
            comuna: order.address.comuna,
            amount: "$19.990", // Standard price for now
            admin_url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin`,
            message: "", // Empty for template trigger
        };

        const success = await sendEmail(templateSlug, order.customer.email, variables);

        return NextResponse.json({ success });
    } catch (error: any) {
        console.error('Send Template Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
