import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { DEFAULT_TEMPLATES } from "@/lib/email-defaults";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const token = req.headers.get("x-admin-token");
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let templates = await prisma.emailTemplate.findMany({
            orderBy: { name: "asc" }
        });

        const templateSlugs = new Set(templates.map(t => t.slug));
        let addedNew = false;
        
        for (const t of DEFAULT_TEMPLATES) {
            if (!templateSlugs.has(t.slug)) {
                await prisma.emailTemplate.create({
                    data: {
                        slug: t.slug,
                        name: t.name,
                        subject: t.subject,
                        body: t.body,
                        defaultSubject: t.subject,
                        defaultBody: t.body,
                        placeholders: t.placeholders
                    }
                });
                addedNew = true;
            }
        }

        if (addedNew) {
            templates = await prisma.emailTemplate.findMany({
                orderBy: { name: "asc" }
            });
        }

        return NextResponse.json({ success: true, templates });
    } catch (error) {
        console.error("Error fetching templates:", error);
        return NextResponse.json({ success: false, error: "Error fetching templates" }, { status: 500 });
    }
}
