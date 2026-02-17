import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const product = await prisma.product.findFirst({
            where: { active: true },
            orderBy: { createdAt: 'asc' }
        });

        if (!product) {
            return NextResponse.json({ success: false, error: "No active product found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error("Error fetching active product:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
