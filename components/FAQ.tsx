"use client";

import { useState } from "react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "¿Qué sentiré al usarlo?",
            a: "Sentirás micro-pulsos rítmicos y un suave cosquilleo en la palma. No debe ser doloroso; ajusta la intensidad a tu nivel de comodidad."
        },
        {
            q: "¿Cuándo empezaré a notar resultados?",
            a: "Muchos usuarios sienten relajación inmediata. Para mejorar tu rutina de sueño, recomendamos el uso constante por al menos 7 a 14 días."
        },
        {
            q: "¿Quién NO debería usar ZenPulse?",
            a: "No recomendado para personas con marcapasos, implantes electrónicos, epilepsia, arritmias graves, embarazo o menores de 16 años."
        },
        {
            q: "¿Qué incluye mi compra?",
            a: "Recibirás 1 dispositivo ZenPulse, 1 correa de sujeción ajustable, 1 cable de carga USB y el manual de instrucciones en español."
        },
        {
            q: "¿Cómo se carga y se limpia?",
            a: "Se carga vía USB (cable incluido). Para limpiarlo, usa un paño ligeramente húmedo o una toallita con alcohol sobre la superficie metálica."
        },
        {
            q: "¿Tengo garantía si no me gusta?",
            a: "Sí, cuentas con 30 días de garantía de satisfacción. Si el producto no cumple tus expectativas, puedes solicitar la devolución."
        }
    ];

    return (
        <section id="faq" className="section-container py-20">
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
