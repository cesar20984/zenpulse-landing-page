import Link from "next/link";

export const metadata = {
    title: "Devoluciones y Garantía — ZenPulse",
    description: "Política de devoluciones, garantía de 30 días y proceso de reembolso de ZenPulse.",
};

export default function DevolucionesPage() {
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
                <h1 className="text-3xl font-heading font-bold text-text mb-8">Devoluciones y Garantía</h1>

                <div className="space-y-8 text-text/80 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Garantía de satisfacción — 30 días</h2>
                        <p>
                            Si no estás conforme con tu ZenPulse, tienes <strong>30 días calendario</strong> desde la fecha de entrega para solicitar la devolución del producto y recibir un reembolso.
                        </p>
                        <p className="mt-2">
                            La garantía cubre tanto devolución de dinero como cambio del producto en caso de desperfecto de fábrica.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">¿Cómo solicitar una devolución?</h2>
                        <ol className="space-y-3 list-decimal pl-5">
                            <li>Contáctanos con tu <strong>número de pedido</strong> y el <strong>motivo</strong> de la devolución.</li>
                            <li>Coordinaremos el retiro del producto o te indicaremos el punto de entrega.</li>
                            <li>Una vez recibido el producto en nuestras instalaciones, procederemos con el reembolso.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">¿Quién paga el envío de la devolución?</h2>
                        <ul className="space-y-2 list-disc pl-5">
                            <li><strong>Desperfecto de fábrica:</strong> Nosotros nos encargamos del costo de envío de la devolución.</li>
                            <li><strong>El cliente ya no desea el producto:</strong> El costo de envío de la devolución es responsabilidad del cliente.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Tiempos de reembolso</h2>
                        <p>
                            El reembolso se procesa una vez que el producto ha sido recibido y verificado en nuestras instalaciones. El plazo de procesamiento es de <strong>5 a 10 días hábiles</strong> desde la recepción, dependiendo de tu medio de pago.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Condiciones</h2>
                        <ul className="space-y-2 list-disc pl-5">
                            <li>El producto debe estar en condiciones razonables (no dañado intencionalmente).</li>
                            <li>Incluir todos los accesorios originales (correa, cable USB-C, manual).</li>
                            <li>La solicitud debe realizarse dentro de los 30 días calendario desde la fecha de entrega.</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-primary/10">
                    <Link href="/" className="text-primary font-semibold hover:underline">← Volver al inicio</Link>
                </div>
            </main>
        </div>
    );
}
