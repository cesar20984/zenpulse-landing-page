"use client";

import { useState } from "react";
import { COMUNAS_SANTIAGO } from "@/lib/comunas";

interface SantiagoGateProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function SantiagoGate({ isOpen, onClose, onConfirm }: SantiagoGateProps) {
    const [isChecked, setIsChecked] = useState(false);
    const [showComunas, setShowComunas] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-text mb-2">Aviso Importante de Envío</h3>
                    <p className="text-text/70">
                        Actualmente realizamos envíos solo a comunas de Santiago, de <strong>lunes a viernes</strong>.
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowComunas(!showComunas)}
                        className="mt-2 text-primary text-sm font-semibold underline underline-offset-2 hover:text-primary/80 transition-colors"
                    >
                        {showComunas ? "Ocultar comunas" : "Ver comunas con cobertura"}
                    </button>
                </div>

                {/* Comunas list */}
                {showComunas && (
                    <div className="mb-6 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 max-h-48 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-text/70">
                            {COMUNAS_SANTIAGO.map((comuna) => (
                                <p key={comuna} className="py-0.5">{comuna}</p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-4 mb-8">
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <ul className="text-sm text-text/80 space-y-2">
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-600 font-bold">✓ Entrega Hoy:</span> Compras antes de las 12:00 hrs (lunes a viernes).
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-600 font-bold">✓ Entrega Mañana:</span> Compras después de las 12:00 hrs (lunes a viernes).
                            </li>
                        </ul>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-500"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <span className="text-sm text-text/80 select-none group-hover:text-text transition-colors">
                            Confirmo que me encuentro en una comuna de Santiago con cobertura y acepto las condiciones de envío.
                        </span>
                    </label>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => { setShowComunas(false); onClose(); }}
                        className="flex-1 px-6 py-3 rounded-xl border border-primary/20 font-medium text-text/60 hover:bg-background transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        disabled={!isChecked}
                        onClick={onConfirm}
                        className="flex-[2] px-6 py-3 rounded-xl bg-cta text-white font-bold shadow-lg shadow-cta/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                    >
                        Ir a comprar
                    </button>
                </div>
            </div>
        </div>
    );
}
