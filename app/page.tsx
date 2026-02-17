import prisma from "@/lib/prisma";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import ProductDetails from "@/components/ProductDetails";
import HowToUse from "@/components/HowToUse";
import Benefits from "@/components/Benefits";
import Specs from "@/components/Specs";
import Legal from "@/components/Legal";
import FAQ from "@/components/FAQ";
import StickyCTA from "@/components/StickyCTA";
import ClientHome from "@/components/ClientHome";

export default async function Home() {
    const product = await prisma.product.findFirst({
        where: { active: true },
        orderBy: { createdAt: 'asc' }
    });

    // Default values if no product in DB
    const displayProduct = product || {
        name: "ZenPulse Pro",
        price: 19990,
        description: "Dispositivo de estimulación EMS para alivio del estrés y ansiedad.",
        currency: "CLP"
    };

    return (
        <main className="min-h-screen pb-24">
            <ClientHome product={displayProduct}>
                <Hero product={displayProduct} />
                <Problem />
                <ProductDetails />
                <HowToUse />
                <Benefits />
                <Legal />
                <div className="bg-white">
                    <Specs product={displayProduct} />
                    <FAQ />
                </div>
                <StickyCTA product={displayProduct} />
            </ClientHome>
        </main>
    );
}
