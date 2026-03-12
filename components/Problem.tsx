export default function Problem() {
    const items = [
        "La ansiedad te paraliza en tu día a día o no te deja dormir por las noches.",
        "El estrés acumulado no te permite desconectar ni relajar el cuerpo.",
        "Sufres de insomnio y quieres recuperar el control sin depender de pastillas o químicos."
    ];

    return (
        <section className="section-container py-16 md:py-20">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="heading-2 mb-10">Si padeces de esto, ZenPulse es tu solución definitiva</h2>
                <div className="space-y-4">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-primary/5 shadow-sm text-left hover:border-primary/20 transition-colors"
                        >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                {i + 1}
                            </span>
                            <p className="text-text/80 text-lg">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
