import Link from "next/link";

export const metadata = {
    title: "Política de Privacidad — ZenPulse",
    description: "Información sobre cómo ZenPulse recopila, usa y protege tus datos personales.",
};

export default function PrivacidadPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="py-6 border-b border-primary/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <Link href="/" className="text-2xl font-bold text-text">
                        Zen<span className="text-primary italic">Pulse</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-heading font-bold text-text mb-8">Política de Privacidad</h1>

                <div className="space-y-8 text-text/80 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">¿Qué datos recopilamos?</h2>
                        <p>
                            Recopilamos únicamente los datos necesarios para procesar tu compra y realizar el envío:
                        </p>
                        <ul className="mt-3 space-y-2 list-disc pl-5">
                            <li>Nombre y apellido.</li>
                            <li>Teléfono de contacto.</li>
                            <li>Dirección de entrega (calle, número, comuna).</li>
                            <li>Correo electrónico (opcional).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">¿Para qué usamos tus datos?</h2>
                        <p>
                            Tus datos se usan exclusivamente para:
                        </p>
                        <ul className="mt-3 space-y-2 list-disc pl-5">
                            <li>Procesar y confirmar tu pedido.</li>
                            <li>Coordinar la entrega de tu producto.</li>
                            <li>Comunicarnos contigo en caso de novedades con tu envío.</li>
                        </ul>
                        <p className="mt-3">
                            <strong>No usamos tus datos para ningún otro propósito.</strong> No enviamos marketing no solicitado ni compartimos tu información con terceros para fines publicitarios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Terceros involucrados</h2>
                        <p>
                            Como cualquier tienda online, utilizamos servicios de terceros para operar:
                        </p>
                        <ul className="mt-3 space-y-2 list-disc pl-5">
                            <li><strong>Mercado Pago:</strong> Procesa los pagos de forma segura. ZenPulse no almacena datos de tarjetas de crédito o débito en ningún momento.</li>
                            <li><strong>Servicio de encomiendas:</strong> Recibe los datos de entrega para coordinar el envío.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">¿Cuánto tiempo guardamos tus datos?</h2>
                        <p>
                            Conservamos tus datos de pedido durante el tiempo necesario para gestionar tu compra, envío y el período de garantía (30 días). Después de ese período, los datos se mantienen únicamente con fines de respaldo contable y legal por el tiempo que la normativa vigente lo requiera.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Tus derechos</h2>
                        <p>
                            Puedes solicitar en cualquier momento la eliminación de tus datos personales contactándonos directamente. Atenderemos tu solicitud en un plazo razonable.
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-primary/10">
                    <Link href="/" className="text-primary font-semibold hover:underline">← Volver al inicio</Link>
                </div>
            </main>
        </div>
    );
}
