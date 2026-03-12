"use client";

import { useState } from "react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "¿Duele?",
            a: "No. El latido debe sentirse suave y tranquilizador. Ajusta la intensidad hasta encontrar tu punto de calma perfecta."
        },
        {
            q: "¿Cuándo notarás los cambios?",
            a: "El nervio vago reacciona casi instantáneamente reduciendo los nervios y la ansiedad en minutos. Para curar el insomnio desde la raíz, debes usarlo cada noche durante 7 a 14 días."
        },
        {
            q: "¿Sirve para ataques de pánico o ansiedad de día?",
            a: "Absolutamente. Es discreto y cabe en el bolsillo. Ante un episodio de estrés o ansiedad aguda, úsalo en tu mano izquierda y nota cómo regula físicamente tu ritmo cardíaco."
        },
        {
            q: "¿Cómo se carga?",
            a: "USB-C (cable incluido). Limpieza con paño apenas húmedo o toallita con alcohol en la superficie metálica."
        },
        {
            q: "¿Envían fuera de la Región Metropolitana?",
            a: "Por ahora, realizamos envíos solo en la Región Metropolitana de Santiago, pero ¡el envío es GRATIS para todas las comunas con cobertura!"
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
