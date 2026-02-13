import Link from "next/link";
import { COMUNAS_SANTIAGO } from "@/lib/comunas";

export const metadata = {
    title: "Políticas de Envío — ZenPulse",
    description: "Información sobre cobertura, plazos de entrega y condiciones de envío de ZenPulse en Santiago de Chile.",
};

export default function EnviosPage() {
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
                <h1 className="text-3xl font-heading font-bold text-text mb-8">Políticas de Envío</h1>

                <div className="space-y-8 text-text/80 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Cobertura</h2>
                        <p>
                            Realizamos envíos exclusivamente a las siguientes comunas de Santiago de Chile, <strong>de lunes a viernes</strong>:
                        </p>
                        <div className="mt-4 p-4 bg-white rounded-2xl border border-primary/5 shadow-sm">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-sm">
                                {COMUNAS_SANTIAGO.map((comuna) => (
                                    <p key={comuna} className="py-0.5">{comuna}</p>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Plazos de entrega</h2>
                        <ul className="space-y-2 list-disc pl-5">
                            <li><strong>Entrega el mismo día:</strong> Pedidos realizados antes de las 12:00 hrs de lunes a viernes.</li>
                            <li><strong>Entrega al día hábil siguiente:</strong> Pedidos realizados después de las 12:00 hrs, o durante fines de semana y festivos.</li>
                        </ul>
                        <p className="mt-3 text-sm text-text/60">
                            Los plazos aplican para días hábiles (lunes a viernes). No se realizan envíos los sábados, domingos ni festivos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Costo de envío</h2>
                        <p>
                            El envío es <strong>gratuito</strong> para todas las comunas con cobertura.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">¿Qué pasa si no se pudo entregar?</h2>
                        <p>
                            Si el envío no pudo ser entregado (dirección incorrecta, destinatario ausente, etc.), el producto será devuelto a nuestras instalaciones. En ese caso:
                        </p>
                        <ul className="mt-3 space-y-2 list-disc pl-5">
                            <li>Te contactaremos para coordinar un nuevo envío o iniciar el proceso de reembolso.</li>
                            <li>Si optas por reembolso, deberás llenar un formulario de solicitud. El valor del envío será descontado del monto reembolsado.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Coordinación del envío</h2>
                        <p>
                            Al completar tu compra, recibirás un correo con la confirmación de tu orden. Nuestro servicio de encomiendas registra todos los datos del envío, incluyendo confirmación de entrega y fotografías, para brindarte un mejor servicio y respaldo.
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
