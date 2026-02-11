export default function Legal() {
    return (
        <section id="seguridad" className="bg-text text-white py-16">
            <div className="section-container">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h2 className="text-3xl font-heading font-bold">Información Importante de Seguridad</h2>
                    </div>

                    <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                        <p className="text-xl font-semibold mb-6 text-secondary">
                            “Producto de bienestar. No es dispositivo médico ni sustituye diagnóstico o tratamiento médico.”
                        </p>

                        <h4 className="font-bold text-lg mb-4 text-white">No utilizar si presenta:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-8 list-disc pl-5 text-white/80">
                            <li>Marcapasos o implantes electrónicos.</li>
                            <li>Antecedentes de epilepsia o convulsiones.</li>
                            <li>Arritmias cardíacas o problemas de corazón graves.</li>
                            <li>Embarazo.</li>
                            <li>Menores de 16 años.</li>
                            <li>Lesiones o irritación en la piel de las manos.</li>
                        </ul>

                        <div className="space-y-4 text-sm text-white/60">
                            <p>• No usar con manos mojadas ni exponer el dispositivo al agua.</p>
                            <p>• Suspender uso si presenta molestia inusual durante la estimulación.</p>
                            <p>• Consultar con un profesional de la salud si sus dificultades de descanso o ansiedad persisten.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
