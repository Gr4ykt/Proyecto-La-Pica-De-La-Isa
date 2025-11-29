import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router';

function DashboardAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const getInitials = () => {
    const firstName = user.name || user.username;
    const lastName = user.lastname || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const menuItems = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'eventos',
      label: 'Gestión de Eventos',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'usuarios',
      label: 'Gestión de Usuarios',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
      case 'inicio':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }}>
                👑
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Panel de Administrador
                </h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Gestiona eventos, usuarios y configuraciones del sistema
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-6 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: 'var(--secondary)', backgroundColor: 'var(--background)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--secondary)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Eventos</h3>
                    <p className="text-2xl font-bold" style={{ color: 'var(--secondary)' }}>0</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Total de eventos registrados
                </p>
              </div>

              <div className="p-6 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--background)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Usuarios</h3>
                    <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>0</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Total de usuarios registrados
                </p>
              </div>

              <div className="p-6 rounded-xl border-2 transition-all hover:scale-105 sm:col-span-2 lg:col-span-1" style={{ borderColor: '#E5B097', backgroundColor: 'var(--background)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E5B097' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Pendientes</h3>
                    <p className="text-2xl font-bold" style={{ color: '#E5B097' }}>0</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Eventos pendientes de aprobación
                </p>
              </div>
            </div>

            <div className="p-8 rounded-xl text-center" style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }}>
              <h3 className="text-xl font-semibold mb-2">Panel de Administración</h3>
              <p className="text-sm opacity-90 mb-4">
                Desde aquí podrás gestionar todos los aspectos del sistema
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => setActiveSection('eventos')} className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105" style={{ backgroundColor: 'var(--background)', color: 'var(--primary)' }}>
                  Ver Eventos
                </button>
                <button onClick={() => setActiveSection('usuarios')} className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105" style={{ backgroundColor: 'var(--background)', color: 'var(--primary)' }}>
                  Ver Usuarios
                </button>
              </div>
            </div>
          </div>
        );

      case 'eventos':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Gestión de Eventos
              </h2>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                Administra todos los eventos del sistema
              </p>
            </div>

            <div className="p-8 rounded-xl text-center" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
              <p className="text-lg">Funcionalidad de gestión de eventos próximamente...</p>
            </div>
          </div>
        );

      case 'usuarios':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Gestión de Usuarios
              </h2>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                Administra todos los usuarios del sistema
              </p>
            </div>

            <div className="p-8 rounded-xl text-center" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
              <p className="text-lg">Funcionalidad de gestión de usuarios próximamente...</p>
            </div>
          </div>
        );

      case 'perfil':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Mi Perfil</h2>
            </div>

            <div className="p-6 sm:p-8 rounded-xl" style={{ backgroundColor: 'var(--secondary)' }}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover" />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
                    {getInitials()}
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--background)' }}>
                      {user.name || user.username} {user.lastname || ''}
                    </h3>
                    <span className="px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
                      Admin
                    </span>
                  </div>
                  <p className="text-sm opacity-90" style={{ color: 'var(--background)' }}>@{user.username}</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Información Personal</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Nombre</label>
                    <input type="text" defaultValue={user.name || ''} className="w-full px-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Apellido</label>
                    <input type="text" defaultValue={user.lastname || ''} className="w-full px-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Username</label>
                  <input type="text" defaultValue={user.username} className="w-full px-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Email</label>
                  <input type="email" defaultValue={user.email} className="w-full px-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Rol</label>
                  <input type="text" value={user.role} disabled className="w-full px-4 py-2.5 rounded-lg border text-sm opacity-60" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button type="submit" className="btn-primary flex-1">Guardar Cambios</button>
                  <button type="button" className="btn-outline flex-1">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div className="flex">
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ backgroundColor: 'var(--secondary)' }}>
          <div className="p-6 border-b" style={{ borderColor: 'rgba(245, 241, 232, 0.2)' }}>
            <div className="flex items-center justify-between">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
                  {getInitials()}
                </div>
              )}
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2" style={{ color: 'var(--background)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <h3 className="mt-3 font-semibold" style={{ color: 'var(--background)' }}>
              {user.name || user.username} {user.lastname || ''}
            </h3>
            <p className="text-sm opacity-80" style={{ color: 'var(--background)' }}>@{user.username}</p>
            <span className="inline-block mt-2 px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
              Administrador
            </span>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveSection(item.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === item.id ? 'scale-105' : 'hover:scale-102'}`} style={{ backgroundColor: activeSection === item.id ? 'var(--primary)' : 'transparent', color: 'var(--background)' }}>
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all" style={{ backgroundColor: 'rgba(245, 241, 232, 0.1)', color: 'var(--background)' }} onClick={() => { logout(); navigate('/'); }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        <main className="flex-1 min-h-screen">
          <div className="lg:hidden sticky top-0 z-30 p-4 border-b" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2" style={{ color: 'var(--text-primary)' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardAdmin;