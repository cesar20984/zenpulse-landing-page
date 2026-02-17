import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        let settings = await prisma.globalSetting.findMany();

        // Seed price if it doesn't exist
        const priceSetting = settings.find(s => s.key === "product_price");
        if (!priceSetting) {
            const newSetting = await prisma.globalSetting.create({
                data: {
                    key: "product_price",
                    value: "19990"
                }
            });
            settings.push(newSetting);
        }

        return NextResponse.json({ success: true, settings });
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ success: false, error: "Error fetching settings" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const token = request.headers.get("x-admin-token");
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { key, value } = body;

        if (!key || value === undefined) {
            return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
        }

        const updated = await prisma.globalSetting.upsert({
            where: { key },
            update: { value: value.toString() },
            create: { key, value: value.toString() }
        });

        return NextResponse.json({ success: true, setting: updated });
    } catch (error) {
        console.error("Error updating setting:", error);
        return NextResponse.json({ success: false, error: "Error updating setting" }, { status: 500 });
    }
}
