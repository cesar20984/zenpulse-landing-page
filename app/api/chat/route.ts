import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "API Key no configurada" }, { status: 500 });
        }

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
                    - Qué es: Un dispositivo portátil (pulsera) que usa estimulación suave (EMS) para calmar el sistema nervioso.
                    - Beneficios: Calma mental, apoyo al descanso (sueño), foco y concentración.
                    - Precio: $19.990 CLP.
                    - Envío: Solo Santiago de Chile. Entrega Hoy (Same Day) antes de las 12:00, Entrega Mañana (Next Day) después.
                    - Garantía: 30 días de satisfacción.
                    - Uso: 15-20 min antes de dormir o durante clips de ansiedad. Tiene 20 niveles de intensidad.
                    - IMPORTANTE: No es un dispositivo médico. No sustituye medicación. No usar si tiene marcapasos o está embarazada.
                    
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
