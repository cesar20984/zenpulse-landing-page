"use client";

import { useRef } from "react";
import Hero from "@/components/Hero";
import ProductDetails from "@/components/ProductDetails";
import Benefits from "@/components/Benefits";
import HowToUse from "@/components/HowToUse";
import Specs from "@/components/Specs";
import FAQ from "@/components/FAQ";
import Legal from "@/components/Legal";
import StickyCTA from "@/components/StickyCTA";
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
    const chatRef = useRef<{ open: () => void }>(null);

    return (
        <main className="min-h-screen">
            <Hero />
            <ProductDetails />
            <Benefits />
            <HowToUse />
            <div className="bg-white">
                <Specs />
                <FAQ />
            </div>
            <Legal />
            <footer className="bg-primary/10 py-16 text-center text-sm text-text/60">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-lg font-semibold text-text mb-4 flex items-center justify-center gap-2">
                        <span className="text-primary">🛡️</span> 30 días de garantía de satisfacción
                    </p>
                    <p className="mb-6 max-w-md mx-auto">
                        *Envíos exclusivos en Santiago de Chile. Same day para compras antes de las 12:00 hrs.
                    </p>
                    <p>© {new Date().getFullYear()} ZenPulse. Todos los derechos reservados.</p>
                    <p className="mt-2 text-xs opacity-50">Desarrollado para máxima relajación.</p>
                </div>
            </footer>
            <StickyCTA />
            <ChatAssistant ref={chatRef} />
        </main>
    );
}
