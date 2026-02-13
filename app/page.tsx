"use client";

import { useRef } from "react";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import ProductDetails from "@/components/ProductDetails";
import HowToUse from "@/components/HowToUse";
import Benefits from "@/components/Benefits";
import Specs from "@/components/Specs";
import Legal from "@/components/Legal";
import FAQ from "@/components/FAQ";
import StickyCTA from "@/components/StickyCTA";
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
    const chatRef = useRef<{ open: () => void }>(null);

    return (
        <main className="min-h-screen">
            {/* 1) Hero */}
            <Hero />
            {/* 2) Problem identification */}
            <Problem />
            {/* 3) What is / What it feels like */}
            <ProductDetails />
            {/* 4) How to use */}
            <HowToUse />
            {/* 5) Benefits */}
            <Benefits />
            {/* 6) Safety */}
            <Legal />
            {/* 7) What's included + Guarantee */}
            <div className="bg-white">
                <Specs />
                {/* 8) FAQ */}
                <FAQ />
            </div>
            {/* 9) Final CTA Footer */}
            <footer className="bg-background py-20 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
                        Listo. 15 minutos. A dormir.
                    </h2>
                    <p className="text-text/60 mb-8">
                        Sin complicaciones. Sin pastillas. Solo un estímulo suave y tu rutina de descanso.
                    </p>
                    <p className="text-sm text-text/40 mt-8">
                        © {new Date().getFullYear()} ZenPulse. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
            <StickyCTA />
            <ChatAssistant ref={chatRef} />
        </main>
    );
}
