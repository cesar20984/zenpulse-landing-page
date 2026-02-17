"use client";

import { useState, useEffect } from "react";
import { Package, Plus, Save, Trash2, RefreshCw, DollarSign, FileText, ToggleLeft, ToggleRight } from "lucide-react";

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    active: boolean;
}

export default function ProductManager({ token }: { token: string }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [active, setActive] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/products", {
                headers: { "x-admin-token": token }
            });
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
                if (data.products.length > 0) selectProduct(data.products[0]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const selectProduct = (p: Product) => {
        setEditingId(p.id);
        setName(p.name);
        setPrice(p.price.toString());
        setDescription(p.description);
        setActive(p.active);
    };

    const handleCreateNew = () => {
        setEditingId("new");
        setName("");
        setPrice("");
        setDescription("");
        setActive(true);
    };

    const handleSave = async () => {
        if (!name || !price) return alert("Nombre y precio son obligatorios");
        setIsSaving(true);
        try {
            const method = editingId === "new" ? "POST" : "PATCH";
            const url = editingId === "new" ? "/api/admin/products" : `/api/admin/products/${editingId}`;

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token": token
                },
                body: JSON.stringify({ name, price, description, active })
            });

            const data = await res.json();
            if (data.success) {
                await fetchProducts();
                alert("Producto guardado correctamente");
                if (editingId === "new") setEditingId(data.product.id);
            }
        } catch (error) {
            alert("Error al guardar producto");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Eliminar este producto? Esto podría afectar órdenes pasadas.")) return;
        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: "DELETE",
                headers: { "x-admin-token": token }
            });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
                if (editingId === id) handleCreateNew();
            }
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* List */}
            <div className="lg:col-span-1 space-y-2">
                <div className="flex items-center justify-between px-2 mb-4">
                    <h3 className="text-sm font-bold text-text/40 uppercase tracking-widest">Productos</h3>
                    <button
                        onClick={handleCreateNew}
                        className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                        title="Nuevo Producto"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                {products.map(p => (
                    <button
                        key={p.id}
                        onClick={() => selectProduct(p)}
                        className={`group w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${editingId === p.id
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white hover:bg-slate-50 text-text/70 border border-primary/5"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Package className={`w-4 h-4 ${editingId === p.id ? "text-white" : "text-primary"}`} />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold truncate max-w-[120px]">{p.name}</span>
                                <span className={`text-[10px] ${editingId === p.id ? "text-white/60" : "text-text/40"}`}>
                                    ${p.price.toLocaleString('es-CL')}
                                </span>
                            </div>
                        </div>
                        {!p.active && (
                            <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold uppercase">Off</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Editor */}
            <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl border border-primary/5 shadow-soft overflow-hidden">
                    <div className="p-6 border-b border-primary/5 flex items-center justify-between bg-slate-50/50">
                        <div>
                            <h2 className="text-xl font-bold text-text">
                                {editingId === "new" ? "Nuevo Producto" : "Editar Producto"}
                            </h2>
                            <p className="text-xs text-text/40 mt-1">Configura los detalles comerciales de tu producto.</p>
                        </div>
                        <div className="flex gap-2">
                            {editingId !== "new" && (
                                <button
                                    onClick={() => handleDelete(editingId!)}
                                    className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                            >
                                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Guardar
                            </button>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text/40 uppercase tracking-widest flex items-center gap-2">
                                    <Package className="w-3.5 h-3.5" /> Nombre del Producto
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ej: ZenPulse Pro"
                                    className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text/40 uppercase tracking-widest flex items-center gap-2">
                                    <DollarSign className="w-3.5 h-3.5" /> Precio (CLP)
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="19990"
                                    className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-primary"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-text/40 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5" /> Descripción Corta
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe las ventajas principales..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none text-sm leading-relaxed"
                            />
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                    <Package className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text">Estado del Producto</p>
                                    <p className="text-[10px] text-text/40">Si está inactivo, no aparecerá en la página principal.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setActive(!active)}
                                className={`transition-colors ${active ? 'text-primary' : 'text-slate-300'}`}
                            >
                                {active ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
