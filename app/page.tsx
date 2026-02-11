import Hero from "@/components/Hero";
import ProductDetails from "@/components/ProductDetails";
import Benefits from "@/components/Benefits";
import HowToUse from "@/components/HowToUse";
import Specs from "@/components/Specs";
import FAQ from "@/components/FAQ";
import Legal from "@/components/Legal";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
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
            <footer className="bg-primary/10 py-12 text-center text-sm text-text/60">
                <div className="max-w-7xl mx-auto px-4">
                    <p>© {new Date().getFullYear()} ZenPulse. Todos los derechos reservados.</p>
                    <p className="mt-2">Desarrollado para máxima relajación.</p>
                </div>
            </footer>
            <StickyCTA />
        </main>
    );
}
