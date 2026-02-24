"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

import { trackFBEvent } from "@/components/FacebookPixel";

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");

    useEffect(() => {
        // Only track if status is approved/success
        if (status === "approved" || !status) { // MP sometimes doesn't send status back in some flows but sends payment_id
            // Fetch current price to report to FB
            fetch("/api/admin/settings")
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const priceSetting = data.settings.find((s: any) => s.key === "product_price");
                        const price = priceSetting ? parseInt(priceSetting.value) : 19990;

                        trackFBEvent("Purchase", {
                            value: price,
                            currency: "CLP",
                            content_ids: ["zenpulse_device"],
                            content_type: "product"
                        });
                    }
                })
                .catch(() => {
                    // Fallback track if settings fetch fails
                    trackFBEvent("Purchase", { value: 19990, currency: "CLP" });
                });
        }
    }, [status]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 border border-primary/5 shadow-soft text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-text">¡Pago Exitoso!</h1>
                    <p className="text-text/60 leading-relaxed">
                        Gracias por tu compra. Hemos recibido tu pedido correctamente y pronto estaremos procesando tu envío.
                    </p>
                </div>

                {paymentId && (
                    <div className="bg-slate-50 rounded-2xl p-4 text-sm text-text/40 font-mono">
                        ID Pago: {paymentId}
                    </div>
                )}

                <div className="space-y-3 pt-4">
                    <button
                        onClick={() => router.push("/")}
                        className="w-full btn-primary py-4 flex items-center justify-center gap-2 group"
                    >
                        Volver al Inicio
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-xs text-text/40">Te hemos enviado un correo con los detalles.</p>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
