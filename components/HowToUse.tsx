import Image from "next/image";

export default function HowToUse() {
    const steps = [
        {
            title: "Sostener en la palma",
            desc: "Ajusta la correa para que el dispositivo quede firme contra el centro de tu palma."
        },
        {
            title: "Elegir Modo",
            desc: "Presiona el botón de encendido y elige entre los 2 modos disponibles (noche o día)."
        },
        {
            title: "Ajustar Intensidad",
            desc: "Sube o baja entre 20 niveles. Sentirás un cosquilleo suave; ajústalo hasta que sea agradable."
        },
        {
            title: "Relájate",
            desc: "Úsalo 15 minutos antes de dormir. La constancia es clave: úsalo por 7-10 días."
        }
    ];

    return (
        <section id="como-usar" className="section-container">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 order-2 md:order-1">
                    <Image
                        src="/images/lifestyle.webp"
                        alt="Uso de ZenPulse durante el descanso"
                        width={600}
                        height={600}
                        className="rounded-3xl shadow-soft aspect-square object-cover"
                    />
                </div>

                <div className="flex-1 order-1 md:order-2">
                    <h2 className="heading-2">Inicia en solo 15 minutos</h2>
                    <p className="text-xl text-text/70 mb-10">
                        Fácil de integrar en tu día a día. Sin complicaciones, solo bienestar.
                    </p>

                    <div className="space-y-8">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-text mb-1">{step.title}</h4>
                                    <p className="text-text/70">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-secondary/10 rounded-2xl border-l-4 border-primary italic text-text/80 text-sm">
                        “Más intensidad no siempre es mejor; debe ser agradable para tu cuerpo.”
                    </div>
                </div>
            </div>
        </section>
    );
}
