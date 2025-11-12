function App() {
  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Header con Toggle de Tema 
      <header 
        className="border-b p-4 sm:p-6"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
          <h1 
            className="text-xl sm:text-2xl md:text-3xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Centro de Eventos
          </h1>
          <ThemeToggle />
        </div>
      </header>
        */}

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        
        {/* Sección de Botones Primarios */}
        <section className="space-y-3 sm:space-y-4">
          <h2 
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Botones Primarios
          </h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <button className="btn-primary w-full sm:w-auto">
              Reservar Ahora
            </button>
            <button className="btn-primary btn-sm w-full sm:w-auto">
              Botón Pequeño
            </button>
            <button className="btn-primary btn-lg w-full sm:w-auto">
              Botón Grande
            </button>
            <button className="btn-primary w-full sm:w-auto" disabled>
              Deshabilitado
            </button>
          </div>
        </section>

        {/* Sección de Botones Secundarios */}
        <section className="space-y-3 sm:space-y-4">
          <h2 
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Botones Secundarios
          </h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <button className="btn-secondary w-full sm:w-auto">
              Ver Disponibilidad
            </button>
            <button className="btn-secondary btn-sm w-full sm:w-auto">
              Botón Pequeño
            </button>
            <button className="btn-secondary btn-lg w-full sm:w-auto">
              Botón Grande
            </button>
            <button className="btn-secondary w-full sm:w-auto" disabled>
              Deshabilitado
            </button>
          </div>
        </section>

        {/* Sección de Botones Outline */}
        <section className="space-y-3 sm:space-y-4">
          <h2 
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Botones Outline
          </h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <button className="btn-outline w-full sm:w-auto">
              Más Información
            </button>
            <button className="btn-outline btn-sm w-full sm:w-auto">
              Botón Pequeño
            </button>
            <button className="btn-outline btn-lg w-full sm:w-auto">
              Botón Grande
            </button>
            <button className="btn-outline w-full sm:w-auto" disabled>
              Deshabilitado
            </button>
          </div>
        </section>

        {/* Sección de Links */}
        <section className="space-y-3 sm:space-y-4">
          <h2 
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Enlaces de Navegación
          </h2>
          <div className="space-y-2">
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              <a href="#servicios">Ver nuestros servicios</a> disponibles
            </p>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              <a href="#galeria">Explorar galería de eventos</a> realizados
            </p>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              <a href="#contacto">Contactar con nosotros</a> para más información
            </p>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              <a href="#" className="link-button">Link como botón</a>
            </p>
          </div>
        </section>

        {/* Card de Ejemplo */}
        <section className="space-y-3 sm:space-y-4">
          <h2 
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Tarjeta de Evento
          </h2>
          <div 
            className="rounded-lg p-4 sm:p-6 border space-y-3 sm:space-y-4"
            style={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)'
            }}
          >
            <h3 
              className="text-lg sm:text-xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Evento en Zona Campestre
            </h3>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              Disfruta de nuestro hermoso espacio al aire libre, ideal para celebraciones, 
              eventos corporativos y reuniones familiares. Contamos con amplias áreas verdes, 
              pérgola de madera y todas las comodidades para tu evento.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="btn-primary w-full sm:w-auto">
                Reservar
              </button>
              <button className="btn-outline w-full sm:w-auto">
                Ver Detalles
              </button>
            </div>
          </div>
        </section>

        {/* Formulario de Ejemplo */}
        <section className="space-y-3 sm:space-y-4">
          <h2 
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Formulario de Consulta
          </h2>
          <div 
            className="rounded-lg p-4 sm:p-6 border space-y-3 sm:space-y-4"
            style={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="space-y-2">
              <label 
                htmlFor="nombre"
                className="block font-medium text-sm sm:text-base"
                style={{ color: 'var(--text-primary)' }}
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                className="w-full px-3 sm:px-4 py-2 rounded-lg border transition-colors text-sm sm:text-base"
                style={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Juan Pérez"
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="email"
                className="block font-medium text-sm sm:text-base"
                style={{ color: 'var(--text-primary)' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 sm:px-4 py-2 rounded-lg border transition-colors text-sm sm:text-base"
                style={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)'
                }}
                placeholder="juan@ejemplo.com"
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="mensaje"
                className="block font-medium text-sm sm:text-base"
                style={{ color: 'var(--text-primary)' }}
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                rows={4}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border transition-colors text-sm sm:text-base"
                style={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Cuéntanos sobre tu evento..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="btn-primary w-full sm:w-auto">
                Enviar Consulta
              </button>
              <button className="btn-secondary w-full sm:w-auto">
                Limpiar
              </button>
            </div>
          </div>
        </section>

        {/* Botón de Ancho Completo */}
        <section className="space-y-3 sm:space-y-4">
          <h2 
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Botón de Ancho Completo
          </h2>
          <button className="btn-primary btn-block btn-lg">
            Solicitar Cotización Completa
          </button>
        </section>

      </main>

      {/* Footer 
      <footer 
        className="mt-8 sm:mt-12 border-t p-4 sm:p-6"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            © 2025 Centro de Eventos Campestre. Todos los derechos reservados.
          </p>
        </div>
      </footer>
      */}
      
    </div>
  );
}

export default App;