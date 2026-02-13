import Link from "next/link";

export const metadata = {
    title: "Términos y Condiciones — ZenPulse",
    description: "Términos y condiciones de uso, aviso legal y limitaciones de responsabilidad de ZenPulse.",
};

export default function TerminosPage() {
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
                <h1 className="text-3xl font-heading font-bold text-text mb-8">Términos y Condiciones</h1>

                <div className="space-y-8 text-text/80 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Naturaleza del producto</h2>
                        <p>
                            ZenPulse es un <strong>producto de bienestar</strong>. No es un dispositivo médico, no está registrado como tal, y no pretende diagnosticar, tratar, curar ni prevenir ninguna enfermedad o condición médica.
                        </p>
                        <p className="mt-2">
                            Los resultados pueden variar según cada persona. ZenPulse está diseñado para ofrecer una experiencia de relajación a través de estímulos rítmicos suaves, como complemento a hábitos saludables de descanso.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Limitación de responsabilidad</h2>
                        <p>
                            ZenPulse y sus representantes no se hacen responsables de:
                        </p>
                        <ul className="mt-3 space-y-2 list-disc pl-5">
                            <li>Resultados individuales derivados del uso del producto.</li>
                            <li>Uso del producto pese a contraindicaciones indicadas en nuestras políticas de seguridad.</li>
                            <li>Daños derivados del uso inadecuado, modificación o alteración del dispositivo.</li>
                            <li>Expectativas sobre beneficios médicos o terapéuticos no declarados por nosotros.</li>
                        </ul>
                        <p className="mt-3">
                            Si presentas condiciones médicas preexistentes, consulta con un profesional de la salud antes de usar el producto.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Edad mínima</h2>
                        <p>
                            ZenPulse está destinado para uso de personas <strong>mayores de 16 años</strong>. La compra implica la declaración del comprador de cumplir con este requisito.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Compra y pago</h2>
                        <p>
                            Al realizar una compra en nuestro sitio, aceptas estos términos y condiciones, las políticas de envío y las políticas de devolución. El pago se procesa de forma segura a través de Mercado Pago. ZenPulse no almacena datos de tarjetas de crédito ni débito.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Modificaciones</h2>
                        <p>
                            Nos reservamos el derecho de actualizar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas al momento de su publicación en este sitio. El uso continuado del sitio implica la aceptación de los términos vigentes.
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
