import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { getPrice } from "@/lib/settings";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "API Key no configurada" }, { status: 500 });
        }

        const { formatted: currentPrice } = await getPrice();

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "developer", // o1 series uses developer role for system-like instructions
                    content: `Eres ZenAI, el asistente experto de ZenPulse. Tu objetivo es ayudar a los usuarios a entender cómo ZenPulse puede mejorar su bienestar y llevarlos a realizar la compra.
                    
                    INFORMACIÓN DEL PRODUCTO:
                    - Nombre: ZenPulse.
                    - Qué es: Un dispositivo portátil que usa estimulación suave (EMS) en la palma para calmar el sistema nervioso.
                    - Promesa Principal: Mejorar tu rutina de sueño y relajación previa al descanso.
                    - Beneficios: Relajación antes de dormir, apoyo al descanso, foco y calma mental.
                    - Precio: ${currentPrice} CLP.
                    - Envío: Solo Santiago de Chile. Entrega Hoy (si compras antes de las 12:00), Entrega Mañana (si compras después).
                    - Garantía: 30 días de satisfacción total.
                    - Uso: Sostener en la PALMA de la mano con la correa. Recomendado 15 minutos diarios antes de dormir.
                    - IMPORTANTE: No es un dispositivo médico. Ayuda a relajarse, no es un tratamiento para enfermedades. No usar con marcapasos o embarazo.
                    
                    ESTILO:
                    - Empático, calmado, profesional pero cercano.
                    - Si preguntan cómo comprar, diles que hagan clic en el botón "Comprar Ahora" en el sitio.
                    - Sé conciso.`
                },
                ...messages
            ]
        });

        return NextResponse.json({ message: response.choices[0].message.content });
    } catch (error: any) {
        console.error("AI Assistant Error:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}
