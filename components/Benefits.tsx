export default function Benefits() {
    const items = [
        {
            title: "Calma Mental",
            desc: "Ayuda a relajar la mente acelerada y bajar las revoluciones después de un día intenso.",
            icon: "🧘"
        },
        {
            title: "Apoyo al Descanso",
            desc: "Ideal para tu rutina de higiene del sueño, facilitando la transición hacia un sueño reparador.",
            icon: "🌙"
        },
        {
            title: "Foco y Concentración",
            desc: "Micropausas estratégicas que te permiten volver a tus tareas con mayor claridad. ",
            icon: "🎯"
        }
    ];

    return (
        <section id="beneficios" className="section-container bg-white rounded-[3rem] my-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="heading-2">Beneficios que transforman tu día</h2>
                <p className="text-text/60 italic text-sm">*Los resultados pueden variar según cada persona. No es un dispositivo médico.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-background/50 border border-primary/5 hover:border-primary/20 transition-all group">
                        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                        <h3 className="text-xl font-bold mb-4 text-text">{item.title}</h3>
                        <p className="text-text/70 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
