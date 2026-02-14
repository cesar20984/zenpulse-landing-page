"use client";

import { useState } from "react";
import { Mail, X, RefreshCw, Send } from "lucide-react";

interface Order {
    id: string;
    orderNumber: string;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
    };
}

interface ManualEmailModalProps {
    order: Order;
    token: string;
    onClose: () => void;
}

export default function ManualEmailModal({ order, token, onClose }: ManualEmailModalProps) {
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) {
            alert("Por favor escribe un mensaje.");
            return;
        }

        setSending(true);
        try {
            const res = await fetch("/api/admin/orders/email-manual", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token": token
                },
                body: JSON.stringify({ id: order.id, body: message })
            });

            const data = await res.json();
            if (data.success) {
                alert("Correo enviado con éxito.");
                onClose();
            } else {
                alert("Error al enviar el correo.");
            }
        } catch (error) {
            alert("Error de conexión.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] max-w-lg w-full shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Correo Manual</h3>
                                <p className="text-xs text-text/40">Para: {order.customer.firstName} {order.customer.lastName} ({order.customer.email})</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                            <X className="w-5 h-5 text-text/40" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-primary/5 text-xs text-text/60 italic">
                            Se usará la plantilla manual básica. Los datos de la orden (# {order.orderNumber}) y el saludo se añadirán automáticamente.
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text/60 mb-2">Mensaje personalizado</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={6}
                                placeholder="Escribe aquí los detalles que quieras comunicarle al cliente..."
                                className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none resize-none text-sm"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 border border-primary/10 rounded-2xl font-bold hover:bg-slate-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={sending || !message.trim()}
                                className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {sending ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                Enviar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
