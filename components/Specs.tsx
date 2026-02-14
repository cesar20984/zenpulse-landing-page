import Image from "next/image";

export default function Specs() {
    return (
        <section id="incluye" className="section-container bg-background/20 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="heading-2 mb-8">Qué incluye + Garantía</h2>

                    {/* What's included */}
                    <div className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm mb-6">
                        <h3 className="font-bold text-lg text-text mb-4">Tu kit ZenPulse incluye:</h3>
                        <ul className="space-y-3 text-text/70">
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">✓</span>
                                1 dispositivo ZenPulse
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">✓</span>
                                1 correa ajustable
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">✓</span>
                                1 cable USB-C de carga
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">✓</span>
                                Manual de instrucciones
                            </li>
                        </ul>
                    </div>

                    {/* Guarantee */}
                    <div className="p-6 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                        <h3 className="font-bold text-lg text-text mb-2">Garantía 30 días</h3>
                        <p className="text-text/70 mb-3">
                            Si no te gusta, solicitas devolución dentro de 30 días.
                        </p>
                        <p className="text-sm text-text/50">
                            Contáctanos con tu número de pedido y te indicamos el proceso de devolución.
                        </p>
                    </div>
                </div>

                <div className="relative group">
                    <Image
                        src="/images/specs.webp"
                        alt="Kit completo ZenPulse"
                        width={600}
                        height={600}
                        className="rounded-3xl shadow-soft group-hover:scale-[1.02] transition-transform duration-500 aspect-square object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
