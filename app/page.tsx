"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
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
    const [price, setPrice] = useState("$19.990");

    useEffect(() => {
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const priceSetting = data.settings.find((s: any) => s.key === "product_price");
                    if (priceSetting) {
                        const val = parseInt(priceSetting.value);
                        setPrice(`$${val.toLocaleString('es-CL').replace(/,/g, '.')}`);
                    }
                }
            })
            .catch(err => console.error("Error fetching price:", err));
    }, []);

    const openChat = () => {
        chatRef.current?.open();
    };

    return (
        <main className="min-h-screen pb-24">
            {/* Header */}
            <header className="py-6 border-b border-primary/10 bg-white/50 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-text">
                        Zen<span className="text-primary italic">Pulse</span>
                    </Link>
                </div>
            </header>
            {/* 1) Hero */}
            <Hero price={price} />
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

            {/* Consult block — between FAQ and Footer */}
            <section className="bg-background py-12">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <p className="text-text/70 mb-4">¿Tienes dudas sobre ZenPulse?</p>
                    <button
                        onClick={openChat}
                        className="px-8 py-3 border-2 border-primary/20 text-primary rounded-2xl font-bold hover:bg-primary/5 transition-colors"
                    >
                        💬 Consultar
                    </button>
                </div>
            </section>

            {/* 9) Final CTA Footer */}
            <footer className="bg-background pt-16 pb-8 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
                        Listo. 15 minutos. A dormir.
                    </h2>
                    <p className="text-text/60 mb-10">
                        Sin complicaciones. Sin pastillas. Solo un estímulo suave y tu rutina de descanso.
                    </p>

                    {/* Legal links */}
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-text/30 mb-6">
                        <Link href="/envios" className="hover:text-text/50 transition-colors">Envíos</Link>
                        <span>·</span>
                        <Link href="/devoluciones" className="hover:text-text/50 transition-colors">Devoluciones</Link>
                        <span>·</span>
                        <Link href="/terminos" className="hover:text-text/50 transition-colors">Términos</Link>
                        <span>·</span>
                        <Link href="/seguridad" className="hover:text-text/50 transition-colors">Seguridad</Link>
                        <span>·</span>
                        <Link href="/privacidad" className="hover:text-text/50 transition-colors">Privacidad</Link>
                    </div>

                    <p className="text-xs text-text/30">
                        © {new Date().getFullYear()} ZenPulse. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
            <StickyCTA price={price} />
            <ChatAssistant ref={chatRef} />
        </main>
    );
}
