"use client";

import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    ShoppingBag,
    User,
    MapPin,
    Clock,
    CheckCircle2,
    AlertCircle,
    Search,
    RefreshCw,
    LogOut,
    Eye,
    Trash2,
    Download,
    CheckSquare,
    Mail,
    Settings,
    MoreVertical,
    Truck
} from "lucide-react";
import * as XLSX from 'xlsx';
import EmailManager from "@/components/admin/EmailManager";
import ManualEmailModal from "@/components/admin/ManualEmailModal";

interface Order {
    id: string;
    orderNumber: string;
    createdAt: string;
    paymentStatus: string;
    fulfillmentStatus: string;
    packageContents: string;
    customer: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    };
    address: {
        streetAddress: string;
        comuna: string;
        instructions: string;
    };
    isArchived: boolean;
}

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState<"orders" | "emails" | "settings">("orders");
    const [showArchived, setShowArchived] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    // Settings state
    const [price, setPrice] = useState("19990");
    const [productName, setProductName] = useState("ZenPulse");
    const [productDescription, setProductDescription] = useState("");
    const [productCategoryId, setProductCategoryId] = useState("electronics");
    const [inventory, setInventory] = useState("10");
    const [savingSettings, setSavingSettings] = useState(false);

    // Click away to close menu
    useEffect(() => {
        const handleClickAway = () => setActiveMenuId(null);
        window.addEventListener('click', handleClickAway);
        return () => window.removeEventListener('click', handleClickAway);
    }, []);

    // Load state from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem("zenpulse_admin_token");
        const savedTime = localStorage.getItem("zenpulse_admin_token_time");
        const savedTab = localStorage.getItem("zenpulse_active_tab") as "orders" | "emails" | "settings";

        if (savedTab) setActiveTab(savedTab);

        if (savedToken && savedTime) {
            // Check if token is older than 24h
            const isExpired = Date.now() - parseInt(savedTime) > 24 * 60 * 60 * 1000;
            if (isExpired) {
                handleLogout();
            } else {
                setToken(savedToken);
                setIsAuthenticated(true);
                fetchOrders(savedToken); // 🔥 Fetch orders on auto-login
            }
        }
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data.success) {
                const priceSetting = data.settings.find((s: any) => s.key === "product_price");
                if (priceSetting) setPrice(priceSetting.value);

                const nameSetting = data.settings.find((s: any) => s.key === "product_name");
                if (nameSetting) setProductName(nameSetting.value);

                const descSetting = data.settings.find((s: any) => s.key === "product_description");
                if (descSetting) setProductDescription(descSetting.value);

                const catSetting = data.settings.find((s: any) => s.key === "product_category_id");
                if (catSetting) setProductCategoryId(catSetting.value);

                const invSetting = data.settings.find((s: any) => s.key === "product_inventory");
                if (invSetting) setInventory(invSetting.value);
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    const handleUpdateSettings = async () => {
        setSavingSettings(true);
        try {
            const settingsToUpdate = [
                { key: "product_price", value: price },
                { key: "product_name", value: productName },
                { key: "product_description", value: productDescription },
                { key: "product_category_id", value: productCategoryId },
                { key: "product_inventory", value: inventory }
            ];

            for (const setting of settingsToUpdate) {
                await fetch("/api/admin/settings", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "x-admin-token": token
                    },
                    body: JSON.stringify(setting)
                });
            }
            alert("Configuración actualizada con éxito");
        } catch (error) {
            alert("Error al actualizar configuración");
        } finally {
            setSavingSettings(false);
        }
    };

    const handleSendTemplate = async (orderId: string, slug: string) => {
        try {
            const res = await fetch("/api/admin/orders/send-template", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token": token
                },
                body: JSON.stringify({ orderId, templateSlug: slug })
            });
            const data = await res.json();
            if (data.success) {
                alert("Correo enviado con éxito");
            } else {
                alert("Error al enviar el correo");
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    // Save active tab when it changes
    const handleTabChange = (tab: "orders" | "emails" | "settings") => {
        setActiveTab(tab);
        localStorage.setItem("zenpulse_active_tab", tab);
    };

    const fetchOrders = async (providedToken = token) => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/orders", {
                headers: { "x-admin-token": providedToken },
            });
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
                setIsAuthenticated(true);
                localStorage.setItem("zenpulse_admin_token", providedToken);
                localStorage.setItem("zenpulse_admin_token_time", new Date().getTime().toString());
            } else {
                if (isAuthenticated) alert("Sesión expirada o token inválido");
                handleLogout();
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectAllPaidAndNotShipped = () => {
        const target = filteredOrders.filter(o => o.paymentStatus === 'paid' && o.fulfillmentStatus !== 'shipped').map(o => o.id);
        setSelectedIds(new Set(target));
    };

    const clearSelection = () => setSelectedIds(new Set());

    const exportToExcel = () => {
        const selectedOrders = orders.filter(o => selectedIds.has(o.id));
        if (selectedOrders.length === 0) {
            alert("Selecciona al menos una orden para exportar.");
            return;
        }

        const data = selectedOrders.map(o => ({
            "Nombre": o.customer.firstName,
            "Apellido": o.customer.lastName,
            "Teléfono": o.customer.phone,
            "Dirección": o.address.streetAddress,
            "Comuna": o.address.comuna,
            "Indicaciones": o.address.instructions || "",
            "ID Interno": o.orderNumber,
            "Correo": o.customer.email || "",
            "Contenido del paquete": o.packageContents,
            "cantidad de bultos": 1,
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        ws['!cols'] = [
            { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 30 }, { wch: 15 },
            { wch: 25 }, { wch: 18 }, { wch: 25 }, { wch: 25 }, { wch: 18 }
        ];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Listado de Direcciones");
        const today = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(wb, `LMT-ZenPulse-${today}.xlsx`);
    };

    const handleDelete = async (id: string) => {
        const order = orders.find(o => o.id === id);
        const isAlreadyArchived = order?.isArchived;

        const message = isAlreadyArchived
            ? "¿Estás seguro de que quieres eliminar esta orden PERMANENTEMENTE? Esta acción no se puede deshacer."
            : "¿Mover esta orden al archivo? Podrás recuperarla o borrarla definitivamente desde la pestaña de Archivados.";

        if (!confirm(message)) return;

        try {
            const res = await fetch(`/api/admin/orders/delete?id=${id}`, {
                method: "DELETE",
                headers: { "x-admin-token": token },
            });
            if (res.ok) {
                const data = await res.json();
                if (isAlreadyArchived) {
                    setOrders(orders.filter(o => o.id !== id));
                    if (selectedOrder?.id === id) setSelectedOrder(null);
                } else {
                    setOrders(orders.map(o => o.id === id ? { ...o, isArchived: true } : o));
                    if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, isArchived: true });
                }
            } else {
                alert("Error al procesar la solicitud");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Error de conexión");
        }
    };

    const handleEmptyArchive = async () => {
        if (!confirm("¿Estás seguro de que quieres vaciar TODO el archivo permanentemente? Esta acción NO se puede deshacer.")) return;

        try {
            const res = await fetch("/api/admin/orders/delete?bulk=archived", {
                method: "DELETE",
                headers: { "x-admin-token": token },
            });
            if (res.ok) {
                setOrders(orders.filter(o => !o.isArchived));
                alert("Archivo vaciado con éxito");
            } else {
                alert("Error al vaciar el archivo");
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    const handleRestore = async (ids: string[]) => {
        if (ids.length === 0) return;

        try {
            const res = await fetch("/api/admin/orders/restore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token": token
                },
                body: JSON.stringify({ ids })
            });
            if (res.ok) {
                setOrders(orders.map(o => ids.includes(o.id) ? { ...o, isArchived: false } : o));
                clearSelection();
                alert(`${ids.length} órdenes restauradas con éxito`);
            } else {
                alert("Error al restaurar");
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        if (newStatus === 'new') {
            if (!confirm(`¿Estás seguro de que quieres desmarcar esta orden como enviada?`)) return;
        }

        try {
            const res = await fetch("/api/admin/orders/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token": token
                },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (res.ok) {
                setOrders(orders.map(o => o.id === id ? { ...o, fulfillmentStatus: newStatus } : o));
                if (selectedOrder?.id === id) {
                    setSelectedOrder({ ...selectedOrder, fulfillmentStatus: newStatus });
                }
            } else {
                alert("Error al actualizar el estado");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error de conexión");
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetchOrders(token);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setToken("");
        localStorage.removeItem("zenpulse_admin_token");
        localStorage.removeItem("zenpulse_admin_token_time");
    };

    const filteredOrders = orders.filter(o => {
        // Base filter by archive status
        if (showArchived && !o.isArchived) return false;
        if (!showArchived && o.isArchived) return false;

        const searchLow = searchTerm.toLowerCase();
        return (
            (o.orderNumber?.toLowerCase() || "").includes(searchLow) ||
            (o.customer?.firstName?.toLowerCase() || "").includes(searchLow) ||
            (o.customer?.lastName?.toLowerCase() || "").includes(searchLow) ||
            (o.customer?.phone || "").includes(searchTerm)
        );
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-primary/5 shadow-soft">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <LayoutDashboard className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-text">Panel Admin</h1>
                        <p className="text-text/60">Ingresa tu token para continuar</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="ADMIN_TOKEN"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                        <button className="w-full btn-primary py-4">
                            Entrar al Panel
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Sidebar / Nav */}
            <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-primary/5 backdrop-blur-md z-40">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-text">ZenPulse <span className="text-primary">Admin</span></h1>
                        </div>

                        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => handleTabChange("orders")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-white text-primary shadow-sm' : 'text-text/40 hover:text-text/60'}`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Pedidos
                            </button>
                            <button
                                onClick={() => handleTabChange("emails")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'emails' ? 'bg-white text-primary shadow-sm' : 'text-text/40 hover:text-text/60'}`}
                            >
                                <Mail className="w-4 h-4" />
                                Correos
                            </button>
                            <button
                                onClick={() => handleTabChange("settings")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-white text-primary shadow-sm' : 'text-text/40 hover:text-text/60'}`}
                            >
                                <Settings className="w-4 h-4" />
                                Configuración
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => fetchOrders()}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <RefreshCw className={`w-5 h-5 text-text/60 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Salir
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
                {activeTab === "orders" ? (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                <div className="flex items-center gap-4 text-text/60 mb-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    <span className="text-sm font-medium">Total Órdenes</span>
                                </div>
                                <div className="text-3xl font-bold">{orders.filter(o => !o.isArchived).length}</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                <div className="flex items-center gap-4 text-text/60 mb-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    <span className="text-sm font-medium">Pagadas</span>
                                </div>
                                <div className="text-3xl font-bold text-emerald-600">
                                    {orders.filter(o => o.paymentStatus === 'paid' && !o.isArchived).length}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                <div className="flex items-center gap-4 text-text/60 mb-2">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                    <span className="text-sm font-medium">Pendientes</span>
                                </div>
                                <div className="text-3xl font-bold text-amber-600">
                                    {orders.filter(o => o.paymentStatus === 'pending' && !o.isArchived).length}
                                </div>
                            </div>
                        </div>

                        {/* Table Header / Search */}
                        <div className="bg-white rounded-3xl border border-primary/5 shadow-sm">
                            <div className="p-6 border-b border-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-lg font-bold">{showArchived ? 'Pedidos Archivados' : 'Últimos Pedidos'}</h2>
                                    {selectedIds.size > 0 && (
                                        <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold">
                                            {selectedIds.size} seleccionadas
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex bg-slate-100 p-1 rounded-xl mr-2">
                                        <button
                                            onClick={() => { setShowArchived(false); clearSelection(); }}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!showArchived ? 'bg-white shadow-sm text-primary' : 'text-text/40'}`}
                                        >
                                            Activas
                                        </button>
                                        <button
                                            onClick={() => { setShowArchived(true); clearSelection(); }}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${showArchived ? 'bg-white shadow-sm text-red-500' : 'text-text/40'}`}
                                        >
                                            Archivados
                                        </button>
                                    </div>
                                    {!showArchived ? (
                                        <button
                                            onClick={selectAllPaidAndNotShipped}
                                            className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors"
                                        >
                                            <CheckSquare className="w-4 h-4" />
                                            Pagadas No Env.
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            {selectedIds.size > 0 && (
                                                <button
                                                    onClick={() => handleRestore(Array.from(selectedIds))}
                                                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                    Recuperar Seleccionadas
                                                </button>
                                            )}
                                            <button
                                                onClick={handleEmptyArchive}
                                                className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Vaciar Archivo
                                            </button>
                                        </div>
                                    )}
                                    {selectedIds.size > 0 && (
                                        <>
                                            <button
                                                onClick={clearSelection}
                                                className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
                                            >
                                                Limpiar
                                            </button>
                                            <button
                                                onClick={exportToExcel}
                                                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors"
                                            >
                                                <Download className="w-4 h-4" />
                                                Exportar Excel
                                            </button>
                                        </>
                                    )}
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/40" />
                                        <input
                                            type="text"
                                            placeholder="Buscar orden, nombre o fono..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 bg-slate-50 border border-primary/5 rounded-xl text-sm w-full md:w-64 outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-text/50 text-xs font-bold uppercase tracking-wider">
                                        <tr>
                                            <th className="px-4 py-4 w-10">
                                                <input
                                                    type="checkbox"
                                                    checked={filteredOrders.length > 0 && filteredOrders.every(o => selectedIds.has(o.id))}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedIds(new Set(filteredOrders.map(o => o.id)));
                                                        } else {
                                                            clearSelection();
                                                        }
                                                    }}
                                                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                                                />
                                            </th>
                                            <th className="px-6 py-4">Orden</th>
                                            <th className="px-6 py-4">Cliente</th>
                                            <th className="px-6 py-4">Producto</th>
                                            <th className="px-6 py-4">Ubicación</th>
                                            <th className="px-6 py-4">Pago</th>
                                            <th className="px-6 py-4">Estado</th>
                                            <th className="px-6 py-4 text-right">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/5">
                                        {filteredOrders.map((order, index) => (
                                            <tr key={order.id} className={`hover:bg-slate-50 transition-colors ${selectedIds.has(order.id) ? 'bg-primary/5' : ''}`}>
                                                <td className="px-4 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.has(order.id)}
                                                        onChange={() => toggleSelect(order.id)}
                                                        className="w-4 h-4 rounded accent-primary cursor-pointer"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-sm flex items-center gap-2">
                                                        #{order.orderNumber || 'N/A'}
                                                        {order.isArchived && <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-tight">Archivado</span>}
                                                    </div>
                                                    <div className="text-[10px] text-text/40 flex items-center gap-1 mt-1">
                                                        <Clock className="w-3 h-3" />
                                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '---'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-sm">{order.customer?.firstName || 'Sin'} {order.customer?.lastName || 'Nombre'}</div>
                                                    <div className="text-xs text-text/40">{order.customer?.phone || 'Sin fono'}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {order.packageContents || '---'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm">{order.address?.comuna || '---'}</div>
                                                    <div className="text-xs text-text/40 truncate max-w-[150px]">{order.address?.streetAddress || '---'}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${order.paymentStatus === 'paid'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {order.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide">
                                                        {order.fulfillmentStatus || 'new'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end items-center gap-1">
                                                        {order.fulfillmentStatus !== 'shipped' ? (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleUpdateStatus(order.id, 'shipped');
                                                                }}
                                                                title="Marcar como enviado"
                                                                className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors"
                                                            >
                                                                <Truck className="w-5 h-5" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleUpdateStatus(order.id, 'new');
                                                                }}
                                                                title="Desmarcar como enviado"
                                                                className="p-2 hover:bg-amber-50 rounded-lg text-amber-600 transition-colors"
                                                            >
                                                                <RefreshCw className="w-5 h-5" />
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                                                            title="Ver detalles"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>

                                                        <div className="relative">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setActiveMenuId(activeMenuId === order.id ? null : order.id);
                                                                }}
                                                                className={`p-2 rounded-lg transition-colors ${activeMenuId === order.id ? 'bg-primary text-white' : 'hover:bg-slate-100 text-text/60'}`}
                                                                title="Opciones de correo"
                                                            >
                                                                <MoreVertical className="w-5 h-5" />
                                                            </button>

                                                            {activeMenuId === order.id && (
                                                                <div className={`absolute right-0 w-64 bg-white rounded-2xl shadow-2xl border border-primary/10 py-2 z-[100] animate-in fade-in zoom-in duration-200 ${index >= filteredOrders.length - 2 && filteredOrders.length > 1 ? 'bottom-full mb-2 origin-bottom' : 'top-full mt-2 origin-top'}`}>
                                                                    <div className="px-4 py-2 text-[10px] font-bold text-text/30 uppercase tracking-widest border-b border-slate-50 mb-1">Enviar Correo</div>

                                                                    <button
                                                                        onClick={() => handleSendTemplate(order.id, 'purchase-confirmation')}
                                                                        className="w-full text-left px-4 py-2 text-xs font-medium text-text/70 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2"
                                                                    >
                                                                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmación Compra
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleSendTemplate(order.id, 'order-shipped')}
                                                                        className="w-full text-left px-4 py-2 text-xs font-medium text-text/70 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2"
                                                                    >
                                                                        <ShoppingBag className="w-3.5 h-3.5" /> Pedido Enviado
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleSendTemplate(order.id, 'order-delivered')}
                                                                        className="px-4 py-2 text-xs font-medium text-text/70 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2"
                                                                    >
                                                                        <MapPin className="w-3.5 h-3.5" /> Pedido Entregado
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleSendTemplate(order.id, 'order-cancelled')}
                                                                        className="w-full text-left px-4 py-2 text-xs font-medium text-text/70 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2"
                                                                    >
                                                                        <AlertCircle className="w-3.5 h-3.5" /> Pedido Cancelado
                                                                    </button>

                                                                    <div className="h-px bg-slate-50 my-1"></div>

                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedOrder(order);
                                                                            setShowEmailModal(true);
                                                                        }}
                                                                        className="w-full text-left px-4 py-2 text-xs font-bold text-primary hover:bg-primary/5 transition-colors flex items-center gap-2"
                                                                    >
                                                                        <Mail className="w-3.5 h-3.5" /> Correo Personalizado
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <button
                                                            onClick={() => handleDelete(order.id)}
                                                            className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-500 transition-colors"
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : activeTab === "emails" ? (
                    <EmailManager token={token} />
                ) : (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-3xl border border-primary/5 shadow-soft overflow-hidden">
                            <div className="p-8 border-b border-primary/5 bg-slate-50/50">
                                <h2 className="text-xl font-bold text-text">Configuración Global</h2>
                                <p className="text-sm text-text/60 mt-1">Ajusta los valores principales de tu tienda.</p>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text/60">Nombre del Producto</label>
                                            <input
                                                type="text"
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                placeholder="Ej: ZenPulse"
                                                className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text/60">Precio (CLP)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-text/40">$</span>
                                                <input
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none font-bold"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text/60">Descripción del Producto (Mercado Pago)</label>
                                        <textarea
                                            value={productDescription}
                                            onChange={(e) => setProductDescription(e.target.value)}
                                            placeholder="Breve descripción para optimizar aprobación de pagos..."
                                            className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none font-medium min-h-[100px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text/60">ID de Categoría (Mercado Pago)</label>
                                            <input
                                                type="text"
                                                value={productCategoryId}
                                                onChange={(e) => setProductCategoryId(e.target.value)}
                                                placeholder="Ej: electronics, health, instruments..."
                                                className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                            />
                                            <p className="text-[10px] text-text/40 italic">Usa 'electronics' para tecnología o consulta la documentación de Mercado Pago.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text/60">Inventario (Stock)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={inventory}
                                                    onChange={(e) => setInventory(e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-xl border outline-none font-bold ${parseInt(inventory) <= 3 ? 'border-red-200 bg-red-50 text-red-600 focus:ring-red-200' : 'border-primary/10 focus:ring-2 focus:ring-primary/20'}`}
                                                />
                                                {parseInt(inventory) <= 3 && (
                                                    <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                                                )}
                                            </div>
                                            <p className="text-[10px] text-text/40 italic">Se descontará automáticamente con cada pago aprobado.</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                                        <p className="text-xs text-amber-800 leading-relaxed">
                                            <strong>Optimización MP:</strong> Completar el nombre, descripción y categoría ayuda a reducir el fraude y mejora la tasa de aprobación de pagos.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={handleUpdateSettings}
                                        disabled={savingSettings}
                                        className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                                    >
                                        {savingSettings ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                                        Guardar Configuración
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <h3 className="text-2xl font-bold">Detalles de Orden</h3>
                                        <p className="text-primary font-medium">#{selectedOrder.orderNumber}</p>
                                    </div>
                                    <button
                                        onClick={() => setShowEmailModal(true)}
                                        className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors flex items-center gap-2 text-xs font-bold"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Enviar Correo
                                    </button>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <RefreshCw className="w-6 h-6 rotate-45" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-text/40 mb-4 flex items-center gap-2">
                                        <User className="w-4 h-4" /> Cliente
                                    </h4>
                                    <div className="space-y-1">
                                        <p className="font-bold text-lg">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                                        <p className="text-text/70">{selectedOrder.customer.phone}</p>
                                        <p className="text-text/70">{selectedOrder.customer.email || 'Sin email'}</p>
                                    </div>
                                </section>

                                <section>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-text/40 mb-4 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> Entrega
                                    </h4>
                                    <div className="space-y-1">
                                        <p className="font-bold">{selectedOrder.address.comuna}</p>
                                        <p className="text-text/70">{selectedOrder.address.streetAddress}</p>
                                        {selectedOrder.address.instructions && (
                                            <div className="mt-3 p-3 bg-slate-50 rounded-xl text-sm italic text-text/60 border-l-2 border-primary/20">
                                                "{selectedOrder.address.instructions}"
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>

                            <div className="mt-10 p-6 bg-slate-50 rounded-2xl">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-text/40 mb-4">Contenido del Paquete</h4>
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-primary/5">
                                    <span className="font-medium">{selectedOrder.packageContents}</span>
                                    <span className="font-bold text-primary">$19.990</span>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                {selectedOrder.fulfillmentStatus !== 'shipped' && (
                                    <button
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')}
                                        className="flex-1 btn-primary py-4 flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        Marcar como Enviado
                                    </button>
                                )}
                                {selectedOrder.fulfillmentStatus === 'shipped' && (
                                    <button
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'new')}
                                        className="flex-1 bg-emerald-50 text-emerald-600 border border-emerald-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Enviado (Click para deshacer)
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(selectedOrder.id)}
                                    className="px-6 py-4 border border-red-100 text-red-500 rounded-2xl font-bold hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Eliminar
                                </button>
                                <button onClick={() => setSelectedOrder(null)} className="px-6 py-4 border border-primary/10 rounded-2xl font-bold hover:bg-slate-50 transition-colors">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showEmailModal && selectedOrder && (
                <ManualEmailModal
                    order={selectedOrder}
                    token={token}
                    onClose={() => setShowEmailModal(false)}
                />
            )}
        </div>
    );
}
