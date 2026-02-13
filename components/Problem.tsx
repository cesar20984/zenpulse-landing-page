export default function Problem() {
    const items = [
        "Te acuestas y tu mente sigue corriendo.",
        "Estás cansado, pero no logras relajarte.",
        "Quieres una rutina simple sin pastillas."
    ];

    return (
        <section className="section-container py-16 md:py-20">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="heading-2 mb-10">Si esto te pasa, ZenPulse es para ti</h2>
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
