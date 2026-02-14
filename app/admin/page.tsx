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
    Settings
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
}

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState<"orders" | "emails">("orders");
    const [showEmailModal, setShowEmailModal] = useState(false);

    // Load token from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem("zenpulse_admin_token");
        const savedTime = localStorage.getItem("zenpulse_admin_token_time");

        if (savedToken && savedTime) {
            const now = new Date().getTime();
            const twentyFourHours = 24 * 60 * 60 * 1000;

            if (now - parseInt(savedTime) < twentyFourHours) {
                setToken(savedToken);
                fetchOrders(savedToken);
            } else {
                handleLogout();
            }
        }
    }, []);

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

    const selectAllNotShipped = () => {
        const notShipped = filteredOrders.filter(o => o.fulfillmentStatus !== 'shipped').map(o => o.id);
        setSelectedIds(new Set(notShipped));
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
        if (!confirm("¿Estás seguro de que quieres eliminar esta orden? Esta acción no se puede deshacer.")) return;

        try {
            const res = await fetch(`/api/admin/orders/delete?id=${id}`, {
                method: "DELETE",
                headers: { "x-admin-token": token },
            });
            if (res.ok) {
                setOrders(orders.filter(o => o.id !== id));
                if (selectedOrder?.id === id) {
                    setSelectedOrder(null);
                }
            } else {
                alert("Error al eliminar la orden");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
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

    const filteredOrders = orders.filter(o =>
        o.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.phone.includes(searchTerm)
    );

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
                                onClick={() => setActiveTab("orders")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-white text-primary shadow-sm' : 'text-text/40 hover:text-text/60'}`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Pedidos
                            </button>
                            <button
                                onClick={() => setActiveTab("emails")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'emails' ? 'bg-white text-primary shadow-sm' : 'text-text/40 hover:text-text/60'}`}
                            >
                                <Mail className="w-4 h-4" />
                                Correos
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
                                <div className="text-3xl font-bold">{orders.length}</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                <div className="flex items-center gap-4 text-text/60 mb-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    <span className="text-sm font-medium">Pagadas</span>
                                </div>
                                <div className="text-3xl font-bold text-emerald-600">
                                    {orders.filter(o => o.paymentStatus === 'paid').length}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                <div className="flex items-center gap-4 text-text/60 mb-2">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                    <span className="text-sm font-medium">Pendientes</span>
                                </div>
                                <div className="text-3xl font-bold text-amber-600">
                                    {orders.filter(o => o.paymentStatus === 'pending').length}
                                </div>
                            </div>
                        </div>

                        {/* Table Header / Search */}
                        <div className="bg-white rounded-3xl border border-primary/5 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-lg font-bold">Últimos Pedidos</h2>
                                    {selectedIds.size > 0 && (
                                        <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold">
                                            {selectedIds.size} seleccionadas
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={selectAllNotShipped}
                                        className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors"
                                    >
                                        <CheckSquare className="w-4 h-4" />
                                        No enviadas
                                    </button>
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
                                        {filteredOrders.map((order) => (
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
                                                    <div className="font-bold text-sm">#{order.orderNumber}</div>
                                                    <div className="text-[10px] text-text/40 flex items-center gap-1 mt-1">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-sm">{order.customer.firstName} {order.customer.lastName}</div>
                                                    <div className="text-xs text-text/40">{order.customer.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {order.packageContents}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm">{order.address.comuna}</div>
                                                    <div className="text-xs text-text/40 truncate max-w-[150px]">{order.address.streetAddress}</div>
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
                                                        {order.fulfillmentStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {order.fulfillmentStatus !== 'shipped' ? (
                                                            <button
                                                                onClick={() => handleUpdateStatus(order.id, 'shipped')}
                                                                title="Marcar como enviado"
                                                                className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors"
                                                            >
                                                                <ShoppingBag className="w-5 h-5" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleUpdateStatus(order.id, 'new')}
                                                                title="Desmarcar como enviado"
                                                                className="p-2 hover:bg-amber-50 rounded-lg text-amber-600 transition-colors"
                                                            >
                                                                <RefreshCw className="w-5 h-5" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(order.id)}
                                                            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
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
                ) : (
                    <EmailManager token={token} />
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
