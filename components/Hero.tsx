import Image from "next/image";
import { useState, useEffect } from "react";
import { COMUNAS_SANTIAGO } from "@/lib/comunas";
import { trackFBEvent } from "./FacebookPixel";
import { Truck } from "lucide-react";

export default function Hero({ price = "$22.990", compareAtPrice = "$45.990", productName = "ZenPulse" }: { price?: string, compareAtPrice?: string, productName?: string }) {
    const [showComunas, setShowComunas] = useState(false);
    const [deliveryText, setDeliveryText] = useState<string | null>(null);

    useEffect(() => {
        const updateDeliveryText = () => {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();
            const minutes = now.getMinutes();

            // Only show if Monday(1) to Friday(5) AND before 12:00
            if (day >= 1 && day <= 5 && hour < 12) {
                const remainingHours = 11 - hour;
                const remainingMinutes = 59 - minutes;
                
                let timeStr = "";
                if (remainingHours > 0) {
                    timeStr += `${remainingHours} hrs y `;
                }
                timeStr += `${remainingMinutes} mins`;
                
                setDeliveryText(`Recibes hoy si compras en los próximos ${timeStr}`);
            } else {
                setDeliveryText(null); // Hide message entirely outside these windows
            }
        };

        updateDeliveryText();
        const interval = setInterval(updateDeliveryText, 60000);
        return () => clearInterval(interval);
    }, []);

    const handlePurchaseClick = (e: React.MouseEvent) => {
        e.preventDefault();
        trackFBEvent("InitiateCheckout");
        window.location.href = "/checkout";
    };


    return (
        <section className="relative overflow-hidden bg-background pt-8 pb-16 md:pt-12 md:pb-24">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-50" />

            <div className="section-container relative z-10">
                {/* 📸 Centered Image above Title */}
                <div className="max-w-4xl mx-auto mb-16 rounded-[2.5rem] overflow-hidden shadow-soft border border-primary/10 bg-white/40 p-2 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <Image
                        src="/images/hero-product.webp"
                        alt="ZenPulse - Tu compañero de descanso"
                        width={1200}
                        height={500}
                        className="w-full h-auto rounded-[2rem] object-cover aspect-[21/9] md:aspect-[3/1]"
                        priority
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 mb-8">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></span>
                            <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-[0.2em]">Envío GRATIS Incluido</span>
                        </div>
                        <h1 className="heading-1 mb-6 text-text">
                            Relájate antes de dormir con <span className="text-primary italic">pulsos suaves</span> en la palma
                        </h1>
                        <p className="text-xl text-text/80 mb-4 max-w-xl mx-auto md:mx-0">
                            {productName} es un dispositivo portátil que entrega un estímulo rítmico suave en la mano. Te ayuda a bajar revoluciones y entrar en modo descanso.
                        </p>

                        <div className="mb-6 text-center md:text-left flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-secondary text-sm font-bold line-through opacity-50 decoration-secondary/50">{compareAtPrice}</span>
                                <span className="text-4xl font-black text-text tracking-tight">{price}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="px-2 py-0.5 bg-cta/10 text-cta text-[10px] font-black rounded-lg uppercase tracking-wider animate-pulse">
                                    Oferta
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-bold text-emerald-500 uppercase">Envío Gratis</span>
                                    <span className="text-[10px] text-text/30 tracking-wider">CLP</span>
                                </div>
                            </div>
                        </div>

                        {deliveryText && (
                            <div className="mb-6 flex items-center justify-center md:justify-start">
                                <div className="flex items-center gap-2 text-xs md:text-sm text-emerald-700 font-bold bg-emerald-50 w-fit px-4 py-2 rounded-xl border border-emerald-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <Truck className="w-5 h-5 text-emerald-500" />
                                    <span>{deliveryText}</span>
                                </div>
                            </div>
                        )}

                        {/* Trust Block */}
                        <div className="bg-white/50 backdrop-blur-sm border border-primary/5 rounded-2xl p-4 mb-8 text-left max-w-md mx-auto md:mx-0 shadow-sm">
                            <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-wider font-bold text-text/60">
                                <div className="flex items-center gap-2">
                                    <span className="text-emerald-500 text-base">🚚</span>
                                    <div>
                                        <p className="text-text/90 font-bold text-emerald-600">Envío GRATIS</p>
                                        <button
                                            type="button"
                                            onClick={() => setShowComunas(!showComunas)}
                                            className="font-normal normal-case text-primary underline underline-offset-2 hover:text-primary/80 transition-colors cursor-pointer"
                                        >
                                            Solo Región Metropolitana →
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-500 text-base">💳</span>
                                    <div>
                                        <p className="text-text/90">Pago Seguro</p>
                                        <p className="font-normal normal-case text-text/50">Débito y Crédito</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-amber-500 text-base">🛡️</span>
                                    <div>
                                        <p className="text-text/90">Garantía 30 días</p>
                                        <p className="font-normal normal-case text-text/50">De satisfacción</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary text-base">💬</span>
                                    <div>
                                        <p className="text-text/90">Soporte</p>
                                        <p className="font-normal normal-case text-text/50">Directo en el sitio</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comunas dropdown */}
                        {showComunas && (
                            <div className="mb-6 p-4 bg-white rounded-2xl border border-primary/10 shadow-sm max-w-md mx-auto md:mx-0 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-sm font-bold text-text">Comunas con cobertura Región Metropolitana (Lun–Vie)</p>
                                    <button type="button" onClick={() => setShowComunas(false)} className="text-text/40 hover:text-text/60 text-lg">✕</button>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-text/60 max-h-40 overflow-y-auto">
                                    {COMUNAS_SANTIAGO.map((c) => (
                                        <p key={c} className="py-0.5">{c}</p>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-4">
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
                        <p className="text-xs text-text/50 mt-2">
                            Se usa en la palma con correa (no en la muñeca). Uso recomendado: 15 min.
                        </p>


                    </div>

                    <div className="flex-1 relative">
                        <div className="relative z-10 w-full aspect-square md:aspect-auto">
                            <Image
                                src="/images/hero.webp"
                                alt="Persona relajándose con ZenPulse antes de dormir"
                                width={800}
                                height={800}
                                priority
                                className="rounded-3xl shadow-soft object-cover aspect-square"
                            />
                        </div>
                        <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-3 -z-10 translate-x-4 translate-y-4" />
                    </div>
                </div>
            </div>
        </section>
    );
}
