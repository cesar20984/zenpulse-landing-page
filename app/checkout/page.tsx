import { getPrice } from "@/lib/settings";
import CheckoutContent from "@/components/CheckoutContent";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
    const priceData = await getPrice();

    return (
        <CheckoutContent
            initialPrice={{
                raw: priceData.raw,
                formatted: priceData.formatted,
                compareAtFormatted: priceData.compareAtFormatted,
                discountAmountRaw: priceData.discountAmountRaw
            }}
        />
    );
}
