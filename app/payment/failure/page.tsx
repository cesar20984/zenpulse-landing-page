"use client";

import { useRouter } from "next/navigation";
import { XCircle, RefreshCcw, ArrowLeft } from "lucide-react";

export default function PaymentFailurePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 border border-primary/5 shadow-soft text-center space-y-8">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-12 h-12 text-red-500" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-text">Algo salió mal</h1>
                    <p className="text-text/60 leading-relaxed">
                        No pudimos procesar tu pago. Por favor, intenta de nuevo o usa otro medio de pago.
                    </p>
                </div>

                <div className="space-y-3 pt-4">
                    <button
                        onClick={() => router.push("/checkout")}
                        className="w-full btn-primary py-4 flex items-center justify-center gap-2 group bg-red-500 hover:bg-red-600"
                    >
                        Reintentar Pago
                        <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full py-4 text-text/60 font-medium flex items-center justify-center gap-2 hover:text-text transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la tienda
                    </button>
                </div>
            </div>
        </div>
    );
}
