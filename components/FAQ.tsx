"use client";

import { useState } from "react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "¿Duele?",
            a: "No debería. Debe sentirse suave. Ajusta la intensidad hasta que sea agradable."
        },
        {
            q: "¿Cuándo se nota?",
            a: "Algunas personas sienten relajación inmediata. Para establecer una rutina, úsalo 7 a 14 días."
        },
        {
            q: "¿Puedo usarlo de día?",
            a: "Sí. Úsalo en pausas cortas cuando quieras bajar revoluciones."
        },
        {
            q: "¿Cómo se carga?",
            a: "USB-C (cable incluido). Limpieza con paño apenas húmedo o toallita con alcohol en la superficie metálica."
        },
        {
            q: "¿Envían fuera de Santiago?",
            a: "Por ahora, envíos solo en Santiago."
        }
    ];

    return (
        <section id="faq" className="section-container py-16 md:py-20">
            <h2 className="heading-2 text-center mb-12">Preguntas Frecuentes</h2>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl border border-primary/5 shadow-sm overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full p-6 text-left flex justify-between items-center hover:bg-background transition-colors"
                        >
                            <span className="font-bold text-text">{faq.q}</span>
                            <span className={`text-primary transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                                ↓
                            </span>
                        </button>
                        <div className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-48 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 overflow-hidden'
                            }`}>
                            <p className="text-text/70 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
