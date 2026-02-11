import Image from "next/image";

export default function ProductDetails() {
    return (
        <section id="que-es" className="section-container">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1">
                    <h2 className="heading-2">¿Qué es ZenPulse y cómo se siente?</h2>
                    <p className="text-xl text-text/80 leading-relaxed mb-6">
                        Es un dispositivo portátil que emite una <strong>estimulación suave</strong> diseñada para ayudar a calmar el sistema nervioso.
                    </p>
                    <div className="space-y-4 text-text/70">
                        <p className="flex items-start gap-3">
                            <span className="text-primary mt-1">✨</span>
                            <span><strong>Sensación:</strong> Notarás un cosquilleo suave y rítmico en la palma de tu mano, lo cual es completamente normal.</span>
                        </p>
                        <p className="flex items-start gap-3">
                            <span className="text-primary mt-1">✨</span>
                            <span><strong>Personalizable:</strong> Ajusta la intensidad a tu nivel de confort. No debe ser fuerte para ser efectivo.</span>
                        </p>
                        <p className="flex items-start gap-3">
                            <span className="text-primary mt-1">✨</span>
                            <span><strong>Más que un masaje:</strong> Es apoyo rítmico para tu bienestar mental.</span>
                        </p>
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
