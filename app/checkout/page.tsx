"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Truck, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    <div className="flex items-center gap-2 text-text/60 text-sm font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Pago Seguro SSL
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-12">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                                Datos Personales
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text/70 mb-1">Nombre</label>
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10 transition-all"
                                        placeholder="Ej: Juan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text/70 mb-1">Apellido</label>
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10"
                                        placeholder="Ej: Pérez"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text/70 mb-1">Teléfono</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10"
                                        placeholder="+56 9 1234 5678"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text/70 mb-1">Correo (Opcional)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10"
                                        placeholder="juan@ejemplo.com"
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                                Datos de Entrega (Santiago)
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text/70 mb-1">Dirección Completa</label>
                                    <input
                                        required
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10"
                                        placeholder="Calle, número, depto/casa"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text/70 mb-1">Comuna</label>
                                    <input
                                        required
                                        type="text"
                                        name="comuna"
                                        value={formData.comuna}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10"
                                        placeholder="Providencia, Las Condes, etc."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text/70 mb-1">Indicaciones Adicionales</label>
                                    <textarea
                                        name="instructions"
                                        value={formData.instructions}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10"
                                        placeholder="Ej: Dejar en consejería, timbre no funciona..."
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Order Summary Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-8 border border-primary/5 shadow-soft sticky top-32">
                            <h3 className="text-xl font-bold text-text mb-6 pb-6 border-b border-primary/5">Resumen de Orden</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-text/70">
                                    <span>ZenPulse Wellness Device</span>
                                    <span className="font-bold text-text">$19.990</span>
                                </div>
                                <div className="flex justify-between items-center text-text/70">
                                    <span>Envío Santiago</span>
                                    <span className="text-emerald-500 font-bold uppercase text-xs">Gratis</span>
                                </div>
                                <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-xl font-bold text-text">
                                    <span>Total</span>
                                    <span className="text-primary text-2xl">$19.990</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-4 flex items-center justify-center gap-2 group"
                            >
                                {loading ? "Procesando..." : "Realizar Pedido"}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-text/60">
                                    <Truck className="w-5 h-5 text-primary" />
                                    <span>Entrega hoy (antes 12:00)</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-text/60">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    <span>Paga con débito o crédito</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
