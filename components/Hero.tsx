import Image from "next/image";
import { useState } from "react";
import SantiagoGate from "./SantiagoGate";
import { COMUNAS_SANTIAGO } from "@/lib/comunas";
import { trackFBEvent } from "./FacebookPixel";

export default function Hero({ price = "$22.990", productName = "ZenPulse" }: { price?: string, productName?: string }) {
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [showComunas, setShowComunas] = useState(false);

    const handlePurchaseClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsGateOpen(true);
    };

    const handleConfirmSantiago = () => {
        trackFBEvent("InitiateCheckout");
        window.location.href = "/checkout";
    };

    return (
        <section className="relative overflow-hidden bg-background pt-20 pb-16 md:pt-32 md:pb-24">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-50" />

            <div className="section-container relative z-10 flex flex-col md:flex-row items-center gap-12">
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

                    <div className="mb-6 text-center md:text-left flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-text">{price}</span>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-emerald-500 uppercase">Envío Gratis</span>
                            <span className="text-[10px] text-text/40 tracking-wider">CLP</span>
                        </div>
                    </div>

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
                                        Solo Santiago →
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
                                <p className="text-sm font-bold text-text">Comunas con cobertura (Lun–Vie)</p>
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

                    <SantiagoGate
                        isOpen={isGateOpen}
                        onClose={() => setIsGateOpen(false)}
                        onConfirm={handleConfirmSantiago}
                    />
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
        </section>
    );
}
