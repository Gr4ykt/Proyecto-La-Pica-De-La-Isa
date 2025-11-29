export default function ContactHero() {
    return(
        <>
        <div 
            className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300"
            style={{ backgroundColor: 'var(--background)' }}
        >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Columna Izquierda - Información de Contacto */}
                <div className="md:py-4">
                    <h2 
                        className="text-2xl font-bold sm:text-3xl"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Ponte en contacto
                    </h2>

                    <p 
                        className="mt-4 text-pretty"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Estamos aquí para ayudarte a hacer realidad tu evento especial. Contáctanos para 
                        conocer disponibilidad, servicios adicionales y reservar tu fecha en nuestro 
                        hermoso centro de eventos campestre.
                    </p>

                    <dl className="mt-6 space-y-4">
                        {/* Teléfono */}
                        <div 
                            className="p-4 rounded-lg transition-all duration-300 hover:scale-105"
                            style={{ 
                                backgroundColor: 'var(--primary)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <dt className="sr-only">Phone number</dt>

                            <dd className="grid grid-cols-[24px_1fr] items-center gap-3">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="1.5" 
                                    stroke="currentColor" 
                                    className="size-5"
                                    style={{ color: 'var(--background)' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"></path>
                                </svg>

                                <span 
                                    className="font-medium"
                                    style={{ color: 'var(--background)' }}
                                >
                                    +56 9 7398 7505
                                </span>
                            </dd>
                        </div>

                        {/* Email */}
                        <div 
                            className="p-4 rounded-lg transition-all duration-300 hover:scale-105"
                            style={{ 
                                backgroundColor: 'var(--secondary)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <dt className="sr-only">Email</dt>

                            <dd className="grid grid-cols-[24px_1fr] items-center gap-3">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="1.5" 
                                    stroke="currentColor" 
                                    className="size-5"
                                    style={{ color: 'var(--background)' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path>
                                </svg>

                                <span 
                                    className="font-medium"
                                    style={{ color: 'var(--background)' }}
                                >
                                    info@lapicadelaisa.com
                                </span>
                            </dd>
                        </div>

                        {/* Ubicación */}
                        <div 
                            className="p-4 rounded-lg transition-all duration-300 hover:scale-105"
                            style={{ 
                                backgroundColor: 'var(--primary)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <dt className="sr-only">Location</dt>

                            <dd className="grid grid-cols-[24px_1fr] items-center gap-3">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="1.5" 
                                    stroke="currentColor" 
                                    className="size-5 flex-shrink-0"
                                    style={{ color: 'var(--background)' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                                </svg>

                                <span 
                                    className="font-medium"
                                    style={{ color: 'var(--background)' }}
                                >
                                    L-15 7480, San Manuel, Villa Alegre, Maule
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Columna Derecha - Formulario de Contacto */}
                <form 
                    action="#" 
                    className="space-y-4 rounded-lg border p-6 transition-all duration-300"
                    style={{ 
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--background)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <div>
                        <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Nombre
                        </label>

                        <input 
                            className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 transition-all text-sm"
                            style={{
                                borderColor: 'var(--border)',
                                backgroundColor: 'var(--background)',
                                color: 'var(--text-primary)'
                            }}
                            id="name" 
                            type="text" 
                            placeholder="Tu nombre completo" 
                        />
                    </div>

                    <div>
                        <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Email
                        </label>

                        <input 
                            className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 transition-all text-sm"
                            style={{
                                borderColor: 'var(--border)',
                                backgroundColor: 'var(--background)',
                                color: 'var(--text-primary)'
                            }}
                            id="email" 
                            type="email" 
                            placeholder="tucorreo@ejemplo.com" 
                        />
                    </div>

                    <div>
                        <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Teléfono
                        </label>

                        <input 
                            className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 transition-all text-sm"
                            style={{
                                borderColor: 'var(--border)',
                                backgroundColor: 'var(--background)',
                                color: 'var(--text-primary)'
                            }}
                            id="phone" 
                            type="tel" 
                            placeholder="+56 9 1234 5678" 
                        />
                    </div>

                    <div>
                        <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Mensaje
                        </label>

                        <textarea 
                            className="mt-1 w-full resize-none rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 transition-all text-sm"
                            style={{
                                borderColor: 'var(--border)',
                                backgroundColor: 'var(--background)',
                                color: 'var(--text-primary)'
                            }}
                            id="message" 
                            placeholder="Cuéntanos sobre tu evento o consulta..." 
                            rows={5}
                        ></textarea>
                    </div>

                    <button 
                        className="btn-primary w-full py-3 text-base font-semibold"
                        type="submit"
                    >
                        Enviar Mensaje
                    </button>

                    <p 
                        className="text-xs text-center pt-2"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Nos pondremos en contacto contigo lo antes posible
                    </p>
                </form>
            </div>
        </div>
        </>
    );
}