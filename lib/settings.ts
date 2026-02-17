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
