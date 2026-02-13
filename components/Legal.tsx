export default function Legal() {
    return (
        <section id="seguridad" className="bg-text text-white py-16">
            <div className="section-container">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-heading font-bold mb-8">Seguridad</h2>

                    <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                        <h4 className="font-bold text-lg mb-4 text-white">No lo uses si:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-8 text-white/80">
                            <li className="flex items-start gap-2">
                                <span className="text-secondary mt-0.5">•</span>
                                Tienes marcapasos o implantes electrónicos.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary mt-0.5">•</span>
                                Tienes epilepsia o antecedentes de convulsiones.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary mt-0.5">•</span>
                                Tienes arritmias graves o problemas cardíacos graves.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary mt-0.5">•</span>
                                Estás embarazada.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary mt-0.5">•</span>
                                Eres menor de 16 años.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary mt-0.5">•</span>
                                Tienes lesiones o irritación en la piel de la mano.
                            </li>
                        </ul>

                        <div className="text-sm text-white/60 space-y-2 border-t border-white/10 pt-6">
                            <p>No usar con manos mojadas. No exponer al agua. Suspende si sientes molestia inusual.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
