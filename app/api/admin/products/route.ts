import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" }
        });

        // Seed with default product if empty
        if (products.length === 0) {
            await prisma.product.create({
                data: {
                    slug: "zenpulse",
                    name: "ZenPulse Pro",
                    description: "Dispositivo de estimulación EMS para alivio del estrés y ansiedad.",
                    price: 19990,
                    currency: "CLP",
                    active: true
                }
            });
            products = await prisma.product.findMany();
        }

        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ success: false, error: "Error fetching products" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const token = request.headers.get("x-admin-token");
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, price, description, active, slug } = body;

        const product = await prisma.product.create({
            data: {
                name,
                price: parseInt(price),
                description,
                slug: slug || name.toLowerCase().replace(/ /g, "-"),
                active: active ?? true
            }
        });

        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ success: false, error: "Error creating product" }, { status: 500 });
    }
}
