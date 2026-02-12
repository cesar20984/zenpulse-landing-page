import type { Metadata } from "next";
import { Lora, Raleway } from "next/font/google";
import "./globals.css";

const lora = Lora({
    subsets: ["latin"],
    variable: "--font-font-lora",
    weight: ["400", "500", "600", "700"]
});

const raleway = Raleway({
    subsets: ["latin"],
    variable: "--font-font-raleway",
    weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
    title: "ZenPulse - Relajación y Descanso Profundo | Masajeador de Mano",
    description: "Masajeador portátil diseñado para ayudarte a relajarte en pocos minutos. Tecnología de estimulación suave para calmar tu mente y apoyar tu rutina de descanso.",
    openGraph: {
        title: "ZenPulse - Tu Compañero de Bienestar",
        description: "Estimulación suave para relajación, calma y mejor descanso. Sin claims médicos, puro bienestar.",
        locale: "es_CL",
        type: "website",
    },
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <body className={`${lora.variable} ${raleway.variable} font-body bg-background text-text antialiased`}>
                {children}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "¿De verdad funciona?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "ZenPulse utiliza tecnología de estimulación suave diseñada para ayudar a calmar la mente."
                                    }
                                }
                            ]
                        })
                    }}
                />
            </body>
        </html>
    );
}
