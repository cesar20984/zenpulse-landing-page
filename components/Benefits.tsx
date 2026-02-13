export default function Benefits() {
    const items = [
        {
            title: "Relajación antes de dormir",
            desc: "Te da un estímulo rítmico que facilita bajar la activación del día.",
        },
        {
            title: "Rutina simple",
            desc: "No necesitas apps. No necesitas técnicas complejas. Solo 15 minutos.",
        },
        {
            title: "Pausas durante el día",
            desc: "También puedes usarlo para una pausa corta cuando estás saturado.",
        }
    ];

    return (
        <section id="beneficios" className="section-container bg-white rounded-[3rem] my-12 py-16 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="heading-2">Beneficios</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {items.map((item, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-background/50 border border-primary/5 hover:border-primary/20 transition-all">
                        <h3 className="text-xl font-bold mb-3 text-text">{item.title}</h3>
                        <p className="text-text/70 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <p className="text-center text-xs text-text/40 italic">
                Resultados variables según cada persona. Producto de bienestar.
            </p>
        </section>
    );
}
