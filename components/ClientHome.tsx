"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import ChatAssistant from "@/components/ChatAssistant";

interface Product {
    name: string;
    price: number;
    description: string;
    currency: string;
}

export default function ClientHome({ children, product }: { children: ReactNode, product: Product }) {
    const chatRef = useRef<{ open: () => void }>(null);

    const openChat = () => {
        chatRef.current?.open();
    };

    return (
        <>
            {/* Header */}
            <header className="py-6 border-b border-primary/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-text">
                        {product.name.split(' ')[0]}<span className="text-primary italic">{product.name.split(' ')[1] || ''}</span>
                    </Link>
                </div>
            </header>

            {children}

            {/* Consult block — between FAQ and Footer */}
            <section className="bg-background py-12">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <p className="text-text/70 mb-4">¿Tienes dudas sobre {product.name}?</p>
                    <button
                        onClick={openChat}
                        className="px-8 py-3 border-2 border-primary/20 text-primary rounded-2xl font-bold hover:bg-primary/5 transition-colors"
                    >
                        💬 Consultar
                    </button>
                </div>
            </section>

            {/* Final CTA Footer */}
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
                        © {new Date().getFullYear()} {product.name.split(' ')[0]}. Todos los derechos reservados.
                    </p>
                </div>
            </footer>

            <ChatAssistant ref={chatRef} />
        </>
    );
}
