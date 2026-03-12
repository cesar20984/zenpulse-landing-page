import Image from "next/image";

export default function ProductDetails() {
    return (
        <section id="que-es" className="section-container py-16 md:py-20">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1">
                    <h2 className="heading-2 mb-8">Qué es y qué se siente</h2>

                    <div className="space-y-6">
                        <div className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
                            <h3 className="font-bold text-lg text-text mb-2">Qué es</h3>
                            <p className="text-text/70 leading-relaxed">
                                Es una herramienta neuro-estimulante portátil que entrega micro-pulsos calibrados hacia tu sistema nervioso central. Al sujetarlo, estos pulsos rompen el ciclo de la ansiedad y el estrés casi instantáneamente.
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
                            <h3 className="font-bold text-lg text-text mb-2">Qué se siente</h3>
                            <p className="text-text/70 leading-relaxed">
                                Sentirás un latido suave y rítmico en tu mano que le envía una señal física y directa a tu cerebro para apagar la alerta, relajar tu cuerpo y prepararlo para dormir o enfocarse.
                            </p>
                        </div>

                        <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100">
                            <h3 className="font-bold text-lg text-text mb-2">Qué NO es</h3>
                            <p className="text-text/70 leading-relaxed">
                                No es magia ni medicina convencional. Es biotecnología táctil aplicada a tu descanso y enfoque. Si tienes trastornos psiquiátricos severos, consúltalo siempre con tu médico especialista en salud mental.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="bg-white p-4 rounded-[2.5rem] shadow-soft border border-primary/5">
                        <Image
                            src="/images/product.webp"
                            alt="Detalle del dispositivo ZenPulse"
                            width={500}
                            height={500}
                            className="rounded-[2rem] aspect-square object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
