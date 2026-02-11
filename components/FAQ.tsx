"use client";
import { useState } from "react";

const faqs = [
    {
        q: "¿De verdad funciona?",
        a: "ZenPulse utiliza tecnología de estimulación suave diseñada para ayudar a calmar la mente. Los resultados pueden variar, pero la mayoría de los usuarios reportan una sensación de relajación profunda tras 15-20 minutos de uso regular."
    },
    {
        q: "¿Sustituye pastillas o medicación?",
        a: "No. ZenPulse es un dispositivo de bienestar. No es un dispositivo médico ni sustituye ningún diagnóstico o tratamiento profesional. Consulta con un médico antes de realizar cambios en tu salud."
    },
    {
        q: "¿Cuánto tiempo debo usarlo?",
        a: "Recomendamos sesiones de 15-20 minutos antes de dormir para relajar, o micropausas de 10-15 minutos durante el día para recuperar el foco."
    },
    {
        q: "Siento un cosquilleo, ¿es normal?",
        a: "Sí, la sensación de cosquilleo suave es normal y es parte de la estimulación. Puedes ajustar la intensidad entre los 20 niveles disponibles para que sea agradable. Más intensidad no siempre es mejor."
    },
    {
        q: "¿Puedo usarlo mientras estudio o trabajo?",
        a: "¡Absolutamente! Es ideal para micropausas de 10-15 min que ayudan a bajar la tensión acumulada y volver a concentrarse con la mente fresca."
    },
    {
        q: "¿Usa pilas?",
        a: "No, cuenta con una batería interna de 300 mAh recargable mediante USB Tipo C. Ofrece hasta 3 horas de autonomía según la intensidad."
    },
    {
        q: "¿Es tecnología TENS?",
        a: "No es TENS. Es una estimulación suave orientada exclusivamente a la relajación y el calma, no a la rehabilitación muscular física intensa."
    },
    {
        q: "¿Cómo se limpia?",
        a: "Puedes limpiar la superficie con un paño ligeramente humedecido. Nunca lo sumerjas en agua ni lo uses con las manos mojadas."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="section-container">
            <div className="text-center mb-16">
                <h2 className="heading-2">Preguntas Frecuentes</h2>
                <p className="text-text/60">Todo lo que necesitas saber sobre tu descanso.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-primary/10 rounded-2xl bg-background/30 overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full text-left p-6 flex justify-between items-center hover:bg-white/50 transition-colors"
                        >
                            <span className="font-semibold text-lg text-text">{faq.q}</span>
                            <svg
                                className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openIndex === i && (
                            <div className="p-6 pt-0 text-text/70 border-t border-primary/5">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
