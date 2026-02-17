import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import prisma from "@/lib/prisma";

// Configuración de SES
const sesClient = new SESClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const FROM_EMAIL = process.env.AWS_FROM_EMAIL || "info@zenpulse.cl";

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

        // Reemplazar placeholders
        Object.entries(variables).forEach(([key, value]) => {
            const placeholder = new RegExp(`{{${key}}}`, 'g');
            subject = subject.replace(placeholder, value || "");
            body = body.replace(placeholder, value || "");
        });

        const command = new SendEmailCommand({
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: body.replace(/\n/g, "<br>"), // Convertir saltos de línea a HTML
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: body,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subject,
                },
            },
            Source: FROM_EMAIL,
        });

        const response = await sesClient.send(command);
        console.log(`Email sent successfully via SES to ${to}. MessageId: ${response.MessageId}`);
        return true;
    } catch (error) {
        console.error("Error sending email via SES:", error);
        return false;
    }
}
