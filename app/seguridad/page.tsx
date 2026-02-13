import Link from "next/link";

export const metadata = {
    title: "Seguridad y Contraindicaciones — ZenPulse",
    description: "Información completa sobre contraindicaciones, precauciones de uso y recomendaciones de seguridad de ZenPulse.",
};

export default function SeguridadPage() {
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
                <h1 className="text-3xl font-heading font-bold text-text mb-8">Seguridad y Contraindicaciones</h1>

                <div className="space-y-8 text-text/80 leading-relaxed">
                    <section className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100">
                        <p className="font-bold text-text mb-2">Aviso importante</p>
                        <p>
                            ZenPulse es un producto de bienestar. No es un dispositivo médico ni sustituye diagnóstico o tratamiento profesional. Si tienes alguna condición médica, consulta con tu médico antes de usar este producto.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">No usar ZenPulse si:</h2>
                        <ul className="space-y-2 list-disc pl-5">
                            <li>Tienes <strong>marcapasos</strong> o cualquier tipo de implante electrónico.</li>
                            <li>Tienes antecedentes de <strong>epilepsia</strong> o convulsiones.</li>
                            <li>Padeces <strong>arritmias cardíacas graves</strong> u otros problemas cardíacos serios.</li>
                            <li>Estás <strong>embarazada</strong>.</li>
                            <li>Eres <strong>menor de 16 años</strong>.</li>
                            <li>Tienes <strong>lesiones, heridas abiertas o irritación</strong> en la piel de la mano donde se aplica el dispositivo.</li>
                            <li>Tienes <strong>trastornos circulatorios graves</strong> en las extremidades.</li>
                            <li>Tienes <strong>prótesis metálicas</strong> en la mano o muñeca.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Precauciones de uso</h2>
                        <ul className="space-y-2 list-disc pl-5">
                            <li>No usar con manos mojadas ni exponer el dispositivo al agua.</li>
                            <li>No usar mientras conduces o manejas maquinaria.</li>
                            <li>Suspende el uso inmediatamente si sientes dolor, molestia inusual, hormigueo excesivo o irritación en la piel.</li>
                            <li>No colocar el dispositivo en otras partes del cuerpo distintas a la palma de la mano.</li>
                            <li>Más intensidad no es mejor. Usa el nivel de intensidad que se sienta agradable.</li>
                            <li>No usar durante más de 30 minutos consecutivos.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Recomendación profesional</h2>
                        <p>
                            Si tienes cualquier condición médica preexistente, estás bajo tratamiento médico, o tienes dudas sobre si este producto es adecuado para ti, <strong>consulta con un profesional de la salud</strong> antes de usarlo.
                        </p>
                        <p className="mt-2">
                            Si tus dificultades para dormir, tu ansiedad o tu estrés son severos o persistentes, te recomendamos buscar ayuda profesional. ZenPulse no reemplaza la atención médica.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-text mb-3">Cuidado del dispositivo</h2>
                        <ul className="space-y-2 list-disc pl-5">
                            <li>Cargar con el cable USB-C incluido.</li>
                            <li>Limpiar la superficie metálica con un paño apenas húmedo o una toallita con alcohol isopropílico.</li>
                            <li>No sumergir en agua ni exponer a humedad excesiva.</li>
                            <li>Almacenar en un lugar seco a temperatura ambiente.</li>
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
