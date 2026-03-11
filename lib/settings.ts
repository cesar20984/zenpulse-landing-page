import prisma from "@/lib/prisma";

export async function getPrice() {
    try {
        const settings = await prisma.globalSetting.findMany({
            where: {
                key: { in: ["product_price", "compare_at_price", "discount_amount"] }
            }
        });

        const priceSet = settings.find(s => s.key === "product_price");
        const compareSet = settings.find(s => s.key === "compare_at_price");
        const discountSet = settings.find(s => s.key === "discount_amount");

        const value = priceSet ? parseInt(priceSet.value) : 22990;
        const compareValue = compareSet ? parseInt(compareSet.value) : 45990;
        const discountValue = discountSet ? parseInt(discountSet.value) : 5000;

        return {
            raw: value,
            formatted: `$${value.toLocaleString('es-CL').replace(/,/g, '.')}`,
            compareAtRaw: compareValue,
            compareAtFormatted: `$${compareValue.toLocaleString('es-CL').replace(/,/g, '.')}`,
            discountAmountRaw: discountValue,
        };
    } catch (error) {
        return {
            raw: 22990,
            formatted: "$22.990",
            compareAtRaw: 45990,
            compareAtFormatted: "$45.990",
            discountAmountRaw: 5000,
        };
    }
}

export async function getGlobalSettings() {
    try {
        const settings = await prisma.globalSetting.findMany({
            where: {
                key: { in: ["product_price", "compare_at_price", "product_name"] }
            }
        });

        const priceSet = settings.find(s => s.key === "product_price");
        const compareSet = settings.find(s => s.key === "compare_at_price");
        const nameSet = settings.find(s => s.key === "product_name");

        const priceVal = priceSet ? parseInt(priceSet.value) : 22990;
        const compareVal = compareSet ? parseInt(compareSet.value) : 45990;

        return {
            price: `$${priceVal.toLocaleString('es-CL').replace(/,/g, '.')}`,
            compareAtPrice: `$${compareVal.toLocaleString('es-CL').replace(/,/g, '.')}`,
            productName: nameSet?.value || "ZenPulse"
        };
    } catch (error) {
        return {
            price: "$22.990",
            compareAtPrice: "$45.990",
            productName: "ZenPulse"
        };
    }
}
