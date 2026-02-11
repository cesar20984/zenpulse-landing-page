import Image from "next/image";

export default function Hero() {
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
                    <p className="text-xl text-text/80 mb-8 max-w-xl mx-auto md:mx-0">
                        Diseñado para ayudarte a relajarte en pocos minutos mediante estimulación suave y rítmica.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a href="#comprar" className="btn-primary flex items-center justify-center gap-2">
                            Comprar ahora
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#whatsapp" className="btn-secondary flex items-center justify-center">
                            Consultar por WhatsApp
                        </a>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-text/70 font-medium">
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                            Garantía 30 días
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 011.564 1.563l.82 1.912a1 1 0 01-.902 1.34zM15.803 12.973a1 1 0 01.25 3.762 8.97 8.97 0 01-1.05.174V13.123l1.69-.724a1 1 0 01-.89.89zm-1.126-1.026l1.233.528a1 1 0 01-.788 1.838l-1.233-.528a1 1 0 01.788-1.838z" /></svg>
                            Envío Full / Flex
                        </span>
                    </div>
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
