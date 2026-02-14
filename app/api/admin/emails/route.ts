import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { DEFAULT_TEMPLATES } from "@/lib/email-defaults";

export async function GET() {
    try {
        let templates = await prisma.emailTemplate.findMany({
            orderBy: { name: "asc" }
        });

        // Seed if empty
        if (templates.length === 0) {
            for (const t of DEFAULT_TEMPLATES) {
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
            }
            templates = await prisma.emailTemplate.findMany({
                orderBy: { name: "asc" }
            });
        }

        return NextResponse.json({ success: true, templates });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error fetching templates" }, { status: 500 });
    }
}
