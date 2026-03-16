"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Truck, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";
import { COMUNAS_SANTIAGO } from "@/lib/comunas";

interface CheckoutContentProps {
    initialPrice: { raw: number; formatted: string; compareAtFormatted: string; discountAmountRaw?: number };
}

export default function CheckoutContent({ initialPrice }: CheckoutContentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isDiscounted = searchParams.get("discount") === "true";

    const [loading, setLoading] = useState(false);
    
    // Calculate initial price if discount is present
    const calculatePriceStr = (rawVal: number) => `$${rawVal.toLocaleString('es-CL').replace(/,/g, '.')}`;
    
    const [price, setPrice] = useState(() => {
        let currentRaw = initialPrice.raw;
        if (isDiscounted && initialPrice.discountAmountRaw) {
            currentRaw -= initialPrice.discountAmountRaw;
        }
        return {
            ...initialPrice,
            raw: currentRaw,
            formatted: calculatePriceStr(currentRaw)
        };
    });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        comuna: "",
        instructions: "",
        packageContents: "ZenPulse Wellness Device",
        packagePieces: "1",
    });

    const [deliveryText, setDeliveryText] = useState("Procesando envío rápido...");

    useEffect(() => {
        const updateDeliveryText = () => {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();
            const minutes = now.getMinutes();

            if (day === 6 || (day === 5 && hour >= 12)) {
                setDeliveryText("Entrega en 1 día hábil");
                return;
            }

            if ((day >= 1 && day <= 4 && hour >= 12) || day === 0) {
                setDeliveryText("Recibe mañana");
                return;
            }

            if (day >= 1 && day <= 5 && hour < 12) {
                const remainingHours = 11 - hour;
                const remainingMinutes = 59 - minutes;
                
                let timeStr = "";
                if (remainingHours > 0) {
                    timeStr += `${remainingHours} hrs y `;
                }
                timeStr += `${remainingMinutes} mins`;
                
                setDeliveryText(`Recibes hoy si compras en los próximos ${timeStr}`);
            }
        };

        updateDeliveryText();
        const interval = setInterval(updateDeliveryText, 60000);
        
        // Refresh price on mount to be safe, but now start with correct one
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const priceSetting = data.settings.find((s: any) => s.key === "product_price");
                    const compareSetting = data.settings.find((s: any) => s.key === "compare_at_price");
                    const discountSetting = data.settings.find((s: any) => s.key === "discount_amount");

                    if (priceSetting) {
                        let val = parseInt(priceSetting.value);
                        const compareVal = compareSetting ? parseInt(compareSetting.value) : 45990;
                        const discountVal = discountSetting ? parseInt(discountSetting.value) : 5000;
                        
                        if (isDiscounted) {
                            val -= discountVal;
                        }

                        setPrice({
                            raw: val,
                            formatted: calculatePriceStr(val),
                            compareAtFormatted: calculatePriceStr(compareVal)
                        });
                    }
                }
            })
            .catch(err => console.error("Error refreshing price:", err));

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.comuna) {
            alert("Por favor selecciona una comuna.");
            return;
        }

        setLoading(true);

        try {
            const formDataToSubmit = { ...formData, isDiscounted };
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formDataToSubmit),
            });

            const data = await res.json();

            if (data.success && data.initPoint) {
                window.location.href = data.initPoint;
            } else if (data.success) {
                alert(`¡Orden creada exitosamente! Número de orden: ${data.orderNumber}`);
                router.push("/");
            } else {
                alert("Error al procesar la orden: " + data.error);
            }
        } catch (error) {
            alert("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="py-6 border-b border-primary/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <button type="button" onClick={() => router.push("/")} className="text-2xl font-bold text-text">
                        Zen<span className="text-primary italic">Pulse</span>
                    </button>
                    <Image 
                        src="/images/qbicshop-logo.webp"
                        alt="Vendido por QBICSHOP con Garantía MercadoLibre"
                        width={160}
                        height={40}
                        className="h-7 md:h-9 w-auto object-contain opacity-90"
                    />
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-12">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
                                <h2 className="text-xl font-bold text-text">Información de Envío</h2>
                            </div>

                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-primary/5 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text/60 ml-1">Nombre</label>
                                        <input
                                            required
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Tu nombre"
                                            className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text/60 ml-1">Apellido</label>
                                        <input
                                            required
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Tu apellido"
                                            className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text/60 ml-1">Email (Opcional)</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Para recibir tu número de seguimiento"
                                            className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text/60 ml-1">Celular / WhatsApp</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40 font-bold">+56</span>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="9 1234 5678"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text/60 ml-1">Dirección (Calle y Número)</label>
                                    <input
                                        required
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleChange}
                                        placeholder="Ej: Av. Providencia 1234, Depto 501"
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text/60 ml-1">Comuna (Región Metropolitana)</label>
                                    <select
                                        required
                                        name="comuna"
                                        value={formData.comuna}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium bg-white"
                                    >
                                        <option value="">Selecciona tu comuna</option>
                                        {COMUNAS_SANTIAGO.map((comuna) => (
                                            <option key={comuna} value={comuna}>{comuna}</option>
                                        ))}
                                    </select>
                                    <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider mt-1 px-1">
                                        ✨ Envío Prioritario Gratis incluido para tu comuna
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text/60 ml-1">Instrucciones adicionales (Opcional)</label>
                                    <textarea
                                        name="instructions"
                                        value={formData.instructions}
                                        onChange={handleChange}
                                        placeholder="Ej: Conserjería, dejar en el portón, etc."
                                        rows={2}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium resize-none"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <div className="bg-white rounded-3xl p-6 shadow-soft border border-primary/5 space-y-6">
                                <h3 className="text-lg font-bold text-text">Resumen de Orden</h3>

                                <div className="flex gap-4">
                                    <div className="w-20 h-20 bg-secondary/10 rounded-2xl overflow-hidden shrink-0 relative">
                                        <img src="/images/product.webp" alt="ZenPulse" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="font-bold text-text">ZenPulse Device</p>
                                        <p className="text-sm text-text/40">Cantidad: 1</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-text/30 line-through font-medium">{price.compareAtFormatted}</span>
                                            <p className="text-sm font-bold text-primary">{price.formatted}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-primary/5 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text/60">Subtotal</span>
                                        <span className="text-text font-medium">{price.formatted}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text/60">Envío Prioritario</span>
                                        <span className="text-emerald-500 font-bold uppercase text-[10px] mt-1">Gratis</span>
                                    </div>
                                    <div className="flex justify-between pt-4 text-lg font-bold">
                                        <span className="text-text">Total</span>
                                        <span className="text-primary">{price.formatted}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col items-center justify-center pt-2">
                                        <Image
                                            src="/images/qbicshop-logo.webp"
                                            alt="Vendido y garantizado por QBICSHOP"
                                            width={250}
                                            height={60}
                                            className="h-14 w-auto object-contain mx-auto"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-cta text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Pagar en Mercadopago
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                    
                                    <div className="flex flex-col items-center gap-1.5 pt-1">
                                        <div className="flex gap-3 text-text/30 justify-center">
                                            <CreditCard className="w-5 h-5" />
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <p className="text-[11px] text-text/50 font-medium text-center leading-relaxed">
                                            Puedes pagar de forma segura con tarjeta de crédito, débito, o con tu cuenta de Mercado Pago.
                                        </p>
                                        <p className="text-[10px] text-text/40 font-medium text-center mt-2 px-2 bg-slate-50 py-2 rounded-lg border border-slate-100">
                                            Serás redirigido a Mercado Pago para completar tu pago de forma segura. El cobro aparecerá a nombre de <strong>QBICSHOP</strong>. Tu compra corresponde a ZenPulse.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <div className="flex items-center gap-2 text-[10px] text-emerald-600 uppercase font-bold tracking-widest bg-emerald-50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100">
                                        <Truck className="w-3.5 h-3.5" />
                                        {deliveryText}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-text/40 uppercase font-bold tracking-widest px-3">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Garantía de Satisfacción
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
