"use client";

import { useState } from "react";
import SantiagoGate from "./SantiagoGate";

export default function StickyCTA({ product }: { product: any }) {
    const [isGateOpen, setIsGateOpen] = useState(false);

    const handleConfirmSantiago = () => {
        window.location.href = "/checkout";
    };

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/10 backdrop-blur-xl border-t border-primary/10 z-50 flex justify-center shadow-[0_-10px_30px_rgba(236,72,153,0.1)]">
                <div className="max-w-4xl w-full">
                    <button
                        onClick={() => setIsGateOpen(true)}
                        className="w-full bg-cta text-white py-4 rounded-2xl font-bold text-center active:scale-95 transition-all shadow-lg shadow-cta/20 hover:shadow-cta/40 hover:-translate-y-0.5 text-lg"
                    >
                        Comprar Ahora — ${product.price?.toLocaleString('es-CL')}
                    </button>
                </div>
            </div>

            <SantiagoGate
                isOpen={isGateOpen}
                onClose={() => setIsGateOpen(false)}
                onConfirm={handleConfirmSantiago}
            />
        </>
    );
}
