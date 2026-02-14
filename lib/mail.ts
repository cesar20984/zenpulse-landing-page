import prisma from "@/lib/prisma";

export async function sendEmail(slug: string, to: string, variables: Record<string, string>) {
    try {
        const template = await prisma.emailTemplate.findUnique({
            where: { slug }
        });

        if (!template) {
            console.error(`Email template NOT FOUND: ${slug}`);
            return false;
        }

        let subject = template.subject;
        let body = template.body;

        // Replace placeholders
        Object.entries(variables).forEach(([key, value]) => {
            const placeholder = new RegExp(`{{${key}}}`, 'g');
            subject = subject.replace(placeholder, value || "");
            body = body.replace(placeholder, value || "");
        });

        console.log(`[EMAIL SIMULATION]
To: ${to}
Subject: ${subject}
Body:
-------------------
${body}
-------------------`);

        // TODO: Integrate with Resend or SendGrid here later
        return true;
    } catch (error) {
        console.error("Error in sendEmail:", error);
        return false;
    }
}
