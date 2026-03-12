import Image from "next/image";

export default function HowToUse() {
    const steps = [
        {
            title: "Colócalo en la palma",
            desc: "Sujétalo firmemente de manera que el emisor de pulsos quede en el centro de tu mano izquierda (para relajar) o derecha (para estimular)."
        },
        {
            title: "Activa el modo adecuado",
            desc: "Usa el modo 'Relajar' (luz azul) para insomnio o ansiedad aguda, y modo 'Activar' (luz naranja) para recuperar la concentración."
        },
        {
            title: "Calibra la intensidad",
            desc: "Aumenta o disminuye los pulsos hasta sentir un latido claro y cómodo. No busques que moleste, busca que calme."
        },
        {
            title: "Apaga tu mente en 15 minutos",
            desc: "Se apagará solo tras 15 minutos. Úsalo ante un episodio de estrés, o 15 min antes de dormir todas las noches para resultados definitivos."
        }
    ];

    return (
        <section id="como-usar" className="section-container py-16 md:py-20">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 order-2 md:order-1">
                    <Image
                        src="/images/lifestyle.webp"
                        alt="ZenPulse colocado en la palma de la mano"
                        width={600}
                        height={600}
                        className="rounded-3xl shadow-soft aspect-square object-cover"
                    />
                </div>

                <div className="flex-1 order-1 md:order-2">
                    <h2 className="heading-2">Cómo se usa</h2>
                    <p className="text-text/60 text-sm mt-2 mb-10">
                        4 pasos. Sin complicaciones.
                    </p>

                    <div className="space-y-6">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-5">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-text mb-1">{step.title}</h4>
                                    <p className="text-text/70 text-sm">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
