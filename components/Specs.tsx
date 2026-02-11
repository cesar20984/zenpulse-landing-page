import Image from "next/image";

export default function Specs() {
    const specs = [
        { label: "Carga", value: "USB Tipo C (Cable incluido)" },
        { label: "Batería", value: "300 mAh" },
        { label: "Autonomía", value: "Hasta 3 horas constantes" },
        { label: "Niveles", value: "20 intensidades ajustables" },
        { label: "Modos", value: "2 modos específicos" },
        { label: "Material", value: "Correa amigable con la piel" }
    ];

    return (
        <section id="modos" className="section-container bg-background/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="heading-2">Especificaciones Técnicas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                        {specs.map((spec, i) => (
                            <div key={i} className="border-b border-primary/10 pb-4">
                                <dt className="text-sm font-semibold text-primary uppercase tracking-wider">{spec.label}</dt>
                                <dd className="text-lg text-text font-medium mt-1">{spec.value}</dd>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative group">
                    <Image
                        src="/images/specs.webp"
                        alt="ZenPulse kit completo y detalles"
                        width={600}
                        height={600}
                        className="rounded-3xl shadow-soft group-hover:scale-[1.02] transition-transform duration-500 aspect-square object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
