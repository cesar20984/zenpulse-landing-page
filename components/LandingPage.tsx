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

interface LandingPageProps {
    initialPrice: string;
    initialCompareAtPrice: string;
    initialProductName: string;
}

export default function LandingPage({ initialPrice, initialCompareAtPrice, initialProductName }: LandingPageProps) {
    const chatRef = useRef<{ open: () => void }>(null);
    const [price, setPrice] = useState(initialPrice);
    const [compareAtPrice, setCompareAtPrice] = useState(initialCompareAtPrice);
    const [productName, setProductName] = useState(initialProductName);

    useEffect(() => {
        // Refresh settings on the client side just in case, 
        // but now it starts with the correct ones from props.
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const priceSetting = data.settings.find((s: any) => s.key === "product_price");
                    if (priceSetting) {
                        const val = parseInt(priceSetting.value);
                        setPrice(`$${val.toLocaleString('es-CL').replace(/,/g, '.')}`);
                    }
                    const compareSetting = data.settings.find((s: any) => s.key === "compare_at_price");
                    if (compareSetting) {
                        const val = parseInt(compareSetting.value);
                        setCompareAtPrice(`$${val.toLocaleString('es-CL').replace(/,/g, '.')}`);
                    }
                    const nameSetting = data.settings.find((s: any) => s.key === "product_name");
                    if (nameSetting) setProductName(nameSetting.value);
                }
            })
            .catch(err => console.error("Error refreshing settings:", err));
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
                        {productName}
                    </Link>
                </div>
            </header>

            <Hero price={price} compareAtPrice={compareAtPrice} productName={productName} />
            <Problem />
            <ProductDetails />
            <HowToUse />
            <Benefits />
            <Legal />

            <div className="bg-white">
                <Specs />
                <FAQ />
            </div>

            <section className="bg-background py-12">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <p className="text-text/70 mb-4">
                        ¿Tienes dudas sobre {productName}? Recuerda que el <strong>envío es GRATIS</strong> a todo Santiago.
                    </p>
                    <button
                        onClick={openChat}
                        className="px-8 py-3 border-2 border-primary/20 text-primary rounded-2xl font-bold hover:bg-primary/5 transition-colors"
                    >
                        💬 Consultar
                    </button>
                </div>
            </section>

            <footer className="bg-background pt-16 pb-8 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
                        Despídete de la ansiedad y el insomnio.
                    </h2>
                    <p className="text-text/60 mb-10">
                        Sin clínicas. Sin químicos nocivos ni dependencia a pastillas. La ciencia del control del estrés, directamente en tu mano.
                    </p>

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
