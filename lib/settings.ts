import prisma from "@/lib/prisma";

export async function getPrice() {
    try {
        const setting = await prisma.globalSetting.findUnique({
            where: { key: "product_price" }
        });
        const value = setting ? parseInt(setting.value) : 19990;
        return {
            raw: value,
            formatted: `$${value.toLocaleString('es-CL').replace(/,/g, '.')}`
        };
    } catch (error) {
        return {
            raw: 19990,
            formatted: "$19.990"
        };
    }
}

export async function getGlobalSettings() {
    try {
        const settings = await prisma.globalSetting.findMany({
            where: {
                key: { in: ["product_price", "product_name"] }
            }
        });

        const priceSet = settings.find(s => s.key === "product_price");
        const nameSet = settings.find(s => s.key === "product_name");

        const priceVal = priceSet ? parseInt(priceSet.value) : 19990;

        return {
            price: `$${priceVal.toLocaleString('es-CL').replace(/,/g, '.')}`,
            productName: nameSet?.value || "ZenPulse"
        };
    } catch (error) {
        return {
            price: "$19.990",
            productName: "ZenPulse"
        };
    }
}
