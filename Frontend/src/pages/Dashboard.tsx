import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router';

function DashboardPage() {
  const [activeSection, setActiveSection] = useState('reserva');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Datos de ejemplo del usuario
  const userData = {
    nombre: 'Juan',
    apellido: 'Pérez',
    username: 'juanperez',
    email: 'juan.perez@ejemplo.com',
    telefono: '+56 9 1234 5678',
    avatar: 'JP'
  };

  const menuItems = [
    {
      id: 'reserva',
      label: 'Nueva Reserva',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'historial',
      label: 'Historial',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 'perfil',
      label: 'Mi Perfil',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'reserva':
        return (
          <div className="space-y-6">
            <div>
              <h2 
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Nueva Reserva
              </h2>
              <p 
                className="text-sm sm:text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                Solicita una fecha para tu evento en nuestro centro campestre
              </p>
            </div>

            {/* Cards de información */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                className="p-6 rounded-xl border-2 transition-all hover:scale-105"
                style={{ 
                  borderColor: 'var(--primary)',
                  backgroundColor: 'var(--background)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 
                    className="font-semibold text-lg"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Horarios
                  </h3>
                </div>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Disponible de 9:00 AM a 11:00 PM todos los días
                </p>
              </div>

              <div 
                className="p-6 rounded-xl border-2 transition-all hover:scale-105"
                style={{ 
                  borderColor: 'var(--secondary)',
                  backgroundColor: 'var(--background)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--secondary)' }}
                  >
                    <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 
                    className="font-semibold text-lg"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Capacidad
                  </h3>
                </div>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Hasta 150 personas cómodamente
                </p>
              </div>

              <div 
                className="p-6 rounded-xl border-2 transition-all hover:scale-105 sm:col-span-2 lg:col-span-1"
                style={{ 
                  borderColor: 'var(--primary)',
                  backgroundColor: 'var(--background)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 
                    className="font-semibold text-lg"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Servicios
                  </h3>
                </div>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Pérgola, área verde, mesas y sillas incluidas
                </p>
              </div>
            </div>

            {/* Área de contenido principal */}
            <div 
              className="p-6 sm:p-8 rounded-xl"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}
            >
              <h3 className="text-xl font-semibold mb-4">Formulario de Reserva</h3>
              <p className="text-sm opacity-90">
                Aquí irá el formulario completo para realizar tu reserva. Podrás seleccionar la fecha, 
                hora, cantidad de personas y servicios adicionales que necesites para tu evento.
              </p>
            </div>
          </div>
        );

      case 'historial':
        return (
          <div className="space-y-6">
            <div>
              <h2 
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Historial de Solicitudes
              </h2>
              <p 
                className="text-sm sm:text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                Revisa el estado de tus reservas anteriores y pendientes
              </p>
            </div>

            {/* Lista de solicitudes de ejemplo */}
            <div className="space-y-4">
              {/* Solicitud Aprobada */}
              <div 
                className="p-5 rounded-xl border-l-4 transition-all hover:shadow-lg"
                style={{ 
                  borderColor: 'var(--secondary)',
                  backgroundColor: 'var(--background)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 
                        className="font-semibold text-lg"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Cumpleaños de María
                      </h3>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: 'var(--secondary)',
                          color: 'var(--background)'
                        }}
                      >
                        Aprobada
                      </span>
                    </div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <strong>Fecha:</strong> 15 de Diciembre, 2024
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <strong>Personas:</strong> 80 invitados
                    </p>
                  </div>
                  <button className="btn-outline btn-sm">
                    Ver Detalles
                  </button>
                </div>
              </div>

              {/* Solicitud Pendiente */}
              <div 
                className="p-5 rounded-xl border-l-4 transition-all hover:shadow-lg"
                style={{ 
                  borderColor: '#E5B097',
                  backgroundColor: 'var(--background)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 
                        className="font-semibold text-lg"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Reunión Familiar
                      </h3>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: '#E5B097',
                          color: 'var(--text-primary)'
                        }}
                      >
                        Pendiente
                      </span>
                    </div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <strong>Fecha:</strong> 22 de Enero, 2025
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <strong>Personas:</strong> 45 invitados
                    </p>
                  </div>
                  <button className="btn-outline btn-sm">
                    Ver Detalles
                  </button>
                </div>
              </div>

              {/* Solicitud Rechazada */}
              <div 
                className="p-5 rounded-xl border-l-4 transition-all hover:shadow-lg opacity-75"
                style={{ 
                  borderColor: '#DC2626',
                  backgroundColor: 'var(--background)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 
                        className="font-semibold text-lg"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Evento Corporativo
                      </h3>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: '#DC2626',
                          color: 'white'
                        }}
                      >
                        Rechazada
                      </span>
                    </div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <strong>Fecha:</strong> 10 de Diciembre, 2024
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <strong>Motivo:</strong> Fecha no disponible
                    </p>
                  </div>
                  <button className="btn-outline btn-sm">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Mensaje informativo */}
            <div 
              className="p-6 rounded-xl text-center"
              style={{ 
                backgroundColor: 'var(--secondary)',
                color: 'var(--background)'
              }}
            >
              <p className="text-sm">
                Aquí aparecerá el historial completo de todas tus solicitudes de reserva con su estado actualizado.
              </p>
            </div>
          </div>
        );

      case 'perfil':
        return (
          <div className="space-y-6">
            <div>
              <h2 
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Mi Perfil
              </h2>
              <p 
                className="text-sm sm:text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                Administra tu información personal
              </p>
            </div>

            {/* Avatar y datos principales */}
            <div 
              className="p-6 sm:p-8 rounded-xl"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold flex-shrink-0"
                  style={{ 
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--background)'
                  }}
                >
                  {userData.avatar}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 
                    className="text-2xl font-bold mb-1"
                    style={{ color: 'var(--background)' }}
                  >
                    {userData.nombre} {userData.apellido}
                  </h3>
                  <p 
                    className="text-sm opacity-90 mb-3"
                    style={{ color: 'var(--background)' }}
                  >
                    @{userData.username}
                  </p>
                  <button 
                    className="btn-secondary btn-sm"
                  >
                    Cambiar Foto
                  </button>
                </div>
              </div>
            </div>

            {/* Formulario de información */}
            <div 
              className="p-6 sm:p-8 rounded-xl border"
              style={{ 
                backgroundColor: 'var(--background)',
                borderColor: 'var(--border)'
              }}
            >
              <h3 
                className="text-xl font-semibold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Información Personal
              </h3>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label 
                      className="block mb-2 font-medium text-sm"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      defaultValue={userData.nombre}
                      className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>

                  <div>
                    <label 
                      className="block mb-2 font-medium text-sm"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      defaultValue={userData.apellido}
                      className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.username}
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue={userData.telefono}
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button 
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    Guardar Cambios
                  </button>
                  <button 
                    type="button"
                    className="btn-outline flex-1"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

            {/* Cambiar contraseña */}
            <div 
              className="p-6 sm:p-8 rounded-xl border"
              style={{ 
                backgroundColor: 'var(--background)',
                borderColor: 'var(--border)'
              }}
            >
              <h3 
                className="text-xl font-semibold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Cambiar Contraseña
              </h3>

              <form className="space-y-4">
                <div>
                  <label 
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="••••••••"
                  />
                </div>

                <button 
                  type="submit"
                  className="btn-secondary w-full"
                >
                  Actualizar Contraseña
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
          style={{ backgroundColor: 'var(--primary)' }}
        >
          {/* Header del sidebar */}
          <div className="p-6 border-b" style={{ borderColor: 'rgba(245, 241, 232, 0.2)' }}>
            <div className="flex items-center justify-between">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
                style={{ 
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--background)'
                }}
              >
                {userData.avatar}
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2"
                style={{ color: 'var(--background)' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <h3 
              className="mt-3 font-semibold"
              style={{ color: 'var(--background)' }}
            >
              {userData.nombre} {userData.apellido}
            </h3>
            <p 
              className="text-sm opacity-80"
              style={{ color: 'var(--background)' }}
            >
              @{userData.username}
            </p>
          </div>

          {/* Menú de navegación */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id ? 'scale-105' : 'hover:scale-102'
                }`}
                style={{
                  backgroundColor: activeSection === item.id ? 'var(--secondary)' : 'transparent',
                  color: 'var(--background)'
                }}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Botón de cerrar sesión */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-102"
              style={{
                backgroundColor: 'rgba(245, 241, 232, 0.1)',
                color: 'var(--background)'
              }}
              onClick={() => {
                logout();
                localStorage.removeItem('userpage_refreshed');
                navigate('/');
            }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* Overlay para móvil */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Contenido principal */}
        <main className="flex-1 min-h-screen">
          {/* Header móvil */}
          <div 
            className="lg:hidden sticky top-0 z-30 p-4 border-b"
            style={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)'
            }}
          >
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Contenido */}
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;