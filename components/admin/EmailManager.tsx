"use client";

import { useState, useEffect } from "react";
import { Mail, RefreshCw, Save, RotateCcw, Info } from "lucide-react";

interface EmailTemplate {
    id: string;
    slug: string;
    name: string;
    subject: string;
    body: string;
    placeholders: string[];
}

export default function EmailManager({ token }: { token: string }) {
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editSubject, setEditSubject] = useState("");
    const [editBody, setEditBody] = useState("");

    useEffect(() => {
        fetchTemplates();
    }, []);

    // Update editor state when selected template changes
    useEffect(() => {
        const template = templates.find(t => t.id === editingId);
        if (template) {
            setEditSubject(template.subject);
            setEditBody(template.body);
        }
    }, [editingId, templates]);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/emails", {
                headers: { "x-admin-token": token }
            });
            const data = await res.json();
            if (data.success) {
                setTemplates(data.templates);
                if (data.templates.length > 0 && !editingId) setEditingId(data.templates[0].id);
            }
        } catch (error) {
            console.error("Error fetching templates:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!editingId) return;
        setSavingId(editingId);
        try {
            const res = await fetch(`/api/admin/emails/${editingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token": token
                },
                body: JSON.stringify({ subject: editSubject, body: editBody })
            });
            const data = await res.json();
            if (data.success) {
                setTemplates(templates.map(t => t.id === editingId ? data.template : t));
                alert("Plantilla actualizada con éxito");
            }
        } catch (error) {
            alert("Error al guardar");
        } finally {
            setSavingId(null);
        }
    };

    const handleReset = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres volver al texto original? Se perderán tus cambios actuales.")) return;
        setSavingId(id);
        try {
            const res = await fetch(`/api/admin/emails/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token": token
                },
                body: JSON.stringify({ action: "reset" })
            });
            const data = await res.json();
            if (data.success) {
                setTemplates(templates.map(t => t.id === id ? data.template : t));
                // State update via useEffect will refresh the editor
                alert("Plantilla restaurada");
            }
        } catch (error) {
            console.error("Error resetting:", error);
            alert("Error al restaurar");
        } finally {
            setSavingId(null);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        </div>
    );

    const activeTemplate = templates.find(t => t.id === editingId);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Template List */}
            <div className="lg:col-span-1 space-y-2">
                <h3 className="text-sm font-bold text-text/40 uppercase tracking-widest px-2 mb-4">Plantillas</h3>
                {templates.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setEditingId(t.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${editingId === t.id
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white hover:bg-slate-50 text-text/70 border border-primary/5"
                            }`}
                    >
                        <Mail className={`w-4 h-4 ${editingId === t.id ? "text-white" : "text-primary"}`} />
                        <span className="text-sm font-medium">{t.name}</span>
                    </button>
                ))}
            </div>

            {/* Editor */}
            <div className="lg:col-span-3">
                {activeTemplate ? (
                    <div className="bg-white rounded-3xl border border-primary/5 shadow-soft overflow-hidden">
                        <div className="p-6 border-b border-primary/5 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-text">{activeTemplate.name}</h2>
                                <p className="text-xs text-text/40 font-mono mt-1">slug: {activeTemplate.slug}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleReset(activeTemplate.id)}
                                    disabled={savingId === activeTemplate.id}
                                    className="px-4 py-2 border border-primary/10 rounded-xl text-xs font-bold text-text/60 hover:bg-slate-50 transition-colors flex items-center gap-2"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    Volver al original
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    disabled={savingId === activeTemplate.id}
                                    className="px-6 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    {savingId === activeTemplate.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-text/60 mb-2">Asunto del correo</label>
                                <input
                                    type="text"
                                    value={editSubject}
                                    onChange={(e) => setEditSubject(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="md:col-span-3">
                                    <label className="block text-sm font-bold text-text/60 mb-2">Cuerpo del correo</label>
                                    <textarea
                                        rows={15}
                                        value={editBody}
                                        onChange={(e) => setEditBody(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm leading-relaxed"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <div className="sticky top-4 space-y-4">
                                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                                <Info className="w-3.5 h-3.5" /> Variables
                                            </h4>
                                            <p className="text-[10px] text-text/60 mb-3 leading-tight">
                                                Copia y pega estas variables en el asunto o cuerpo para personalizarlos.
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {activeTemplate.placeholders.map(p => (
                                                    <code key={p} className="px-2 py-1 bg-white border border-primary/10 rounded text-[10px] text-primary font-bold">
                                                        {"{{" + p + "}}"}
                                                    </code>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-primary/5 shadow-soft p-20 text-center">
                        <Mail className="w-12 h-12 text-primary/20 mx-auto mb-4" />
                        <p className="text-text/40">Selecciona una plantilla para editar</p>
                    </div>
                )}
            </div>
        </div>
    );
}
