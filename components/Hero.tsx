import Image from "next/image";
import { useState } from "react";
import SantiagoGate from "./SantiagoGate";

export default function Hero() {
    const [isGateOpen, setIsGateOpen] = useState(false);

    const handlePurchaseClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsGateOpen(true);
    };

    const handleConfirmSantiago = () => {
        window.location.href = "https://articulo.mercadolibre.cl/MLC-2858770728-dispositivo-portatil-aliviar-estres-ansiedad-insomni";
    };
    return (
        <section className="relative overflow-hidden bg-background pt-20 pb-16 md:pt-32 md:pb-24">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-50" />

            <div className="section-container relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                        Bienestar Tecnológico
                    </span>
                    <h1 className="heading-1 mb-6 text-text">
                        Tu momento de calma, <span className="text-primary italic">donde sea que estés</span>
                    </h1>
                    <p className="text-xl text-text/80 mb-4 max-w-xl mx-auto md:mx-0">
                        Diseñado para ayudarte a relajarte en pocos minutos mediante estimulación suave y rítmica.
                    </p>
                    <div className="mb-8 text-center md:text-left">
                        <span className="text-3xl font-bold text-text">$19.990</span>
                        <span className="text-sm text-text/60 ml-2">CLP</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={handlePurchaseClick}
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            Comprar ahora
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <SantiagoGate
                        isOpen={isGateOpen}
                        onClose={() => setIsGateOpen(false)}
                        onConfirm={handleConfirmSantiago}
                    />

                </div>

                <div className="flex-1 relative">
                    <div className="relative z-10 w-full aspect-square md:aspect-auto">
                        {/* IMG_HERO - Mapping to first image provided */}
                        <Image
                            src="/images/hero.webp"
                            alt="Mujer durmiendo tranquilamente con ZenPulse"
                            width={800}
                            height={800}
                            priority
                            className="rounded-3xl shadow-soft object-cover aspect-square"
                        />
                    </div>
                    <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-3 -z-10 translate-x-4 translate-y-4" />
                </div>
            </div>
        </section>
    );
}
