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
                data: { key: "product_price", value: "19990" }
            });
            settings.push(newSetting);
        }

        // Seed product name
        const nameSetting = settings.find(s => s.key === "product_name");
        if (!nameSetting) {
            const newSetting = await prisma.globalSetting.create({
                data: { key: "product_name", value: "ZenPulse" }
            });
            settings.push(newSetting);
        }

        // Seed product description
        const descSetting = settings.find(s => s.key === "product_description");
        if (!descSetting) {
            const newSetting = await prisma.globalSetting.create({
                data: { key: "product_description", value: "Dispositivo portátil de relajación con estimulación EMS suave para mejorar el descanso." }
            });
            settings.push(newSetting);
        }

        // Seed category ID
        const catSetting = settings.find(s => s.key === "product_category_id");
        if (!catSetting) {
            const newSetting = await prisma.globalSetting.create({
                data: { key: "product_category_id", value: "electronics" }
            });
            settings.push(newSetting);
        }

        // Seed inventory
        const invSetting = settings.find(s => s.key === "product_inventory");
        if (!invSetting) {
            const newSetting = await prisma.globalSetting.create({
                data: { key: "product_inventory", value: "10" }
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
