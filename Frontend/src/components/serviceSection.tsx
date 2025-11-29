export default function ServicesSection() {
    const services = [
      {
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
        title: 'Pérgola Campestre',
        description: 'Amplia pérgola de madera con techo, perfecta para eventos al aire libre protegidos del sol y la lluvia.'
      },
      {
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        title: 'Capacidad 150 Personas',
        description: 'Espacio diseñado para albergar cómodamente hasta 150 invitados con mesas, sillas y área de circulación.'
      },
      {
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        title: 'Áreas Verdes',
        description: 'Hermosos jardines y zonas verdes para fotografías, juegos infantiles y disfrutar de la naturaleza.'
      },
      {
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        ),
        title: 'Música y Sonido',
        description: 'Sistema de audio profesional incluido. Puedes traer tu propia música o contratar DJ.'
      },
      {
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: 'Horario Flexible',
        description: 'Disponible de 9:00 AM a 11:00 PM. Elige el horario que mejor se adapte a tu evento.'
      },
      {
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        ),
        title: 'Decoración Personalizada',
        description: 'Personaliza el espacio con tu decoración. Ofrecemos soporte para montaje y desmontaje.'
      }
    ];
  
    return (
      <section 
        id="services-section"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Nuestros Servicios
            </h2>
            <p 
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Todo lo que necesitas para que tu evento sea perfecto
            </p>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ 
                  borderColor: index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                  backgroundColor: 'var(--background)'
                }}
              >
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                    color: 'var(--background)'
                  }}
                >
                  {service.icon}
                </div>
                <h3 
                  className="text-xl sm:text-2xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-sm sm:text-base"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
  
          <div className="text-center mt-12 sm:mt-16">
          <a href="/dashboard">
            <button className="btn-primary btn-lg">
              Solicitar Reserva
            </button>
          </a>
          </div>
          
        </div>
      </section>
    );
  }