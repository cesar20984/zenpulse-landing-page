import { getGlobalSettings } from "@/lib/settings";
import LandingPage from "@/components/LandingPage";

export const dynamic = "force-dynamic";

export default async function Home() {
    const { price, compareAtPrice, productName } = await getGlobalSettings();

    return (
        <LandingPage
            initialPrice={price}
            initialCompareAtPrice={compareAtPrice}
            initialProductName={productName}
        />
    );
}
