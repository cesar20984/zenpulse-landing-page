export default function Benefits() {
    const items = [
        {
            title: "Elimina el Insomnio",
            desc: "El micro-pulso rítmico 'engaña' a tu cerebro para apagar la hiperactividad mental, garantizando un sueño profundo y reparador.",
        },
        {
            title: "Desactiva la Ansiedad",
            desc: "Detiene los bucles de ansiedad mediante la estimulación del nervio vago y la regulación táctil de tu sistema nervioso.",
        },
        {
            title: "Reduce el Estrés Diario",
            desc: "Actúa como un botón de 'reinicio' para tu mente. Tómate 15 minutos al día para bajar tu cortisol y recuperar el control.",
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
