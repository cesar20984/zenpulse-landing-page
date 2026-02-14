import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get("x-admin-token");
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const body = await request.json();
        const { subject, body: emailBody } = body;

        const updated = await prisma.emailTemplate.update({
            where: { id },
            data: {
                subject,
                body: emailBody
            }
        });

        return NextResponse.json({ success: true, template: updated });
    } catch (error) {
        console.error("Error updating template:", error);
        return NextResponse.json({ success: false, error: "Error updating template" }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get("x-admin-token");
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const body = await request.json();
        const { action } = body;

        if (action === "reset") {
            const template = await prisma.emailTemplate.findUnique({ where: { id } });
            if (!template) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

            const updated = await prisma.emailTemplate.update({
                where: { id },
                data: {
                    subject: template.defaultSubject,
                    body: template.defaultBody
                }
            });

            return NextResponse.json({ success: true, template: updated });
        }

        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error processing request" }, { status: 500 });
    }
}
