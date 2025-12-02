import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useAdminEvent } from '../context/adminContext';
import { useNavigate } from 'react-router';
import AdminInicioSection from './adminComponents/AdminInicioSection';
import AdminEventosSection from './adminComponents/AdminHistorialSection';
import AdminUsersSection from './adminComponents/AdminUsersSection';
import AdminPerfilSection from './adminComponents/AdminPerfilSection';
import AdminEventDetailModal from './adminComponents/AdminEventDetailModal';

function DashboardAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { events, getEvents } = useAdminEvent();

  useEffect(() => {
    if (activeSection === "eventos") {
      getEvents();
    }
  }, [activeSection]);

  const handleOpenModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    getEvents();
  };

  if (!user) return null;

  const getInitials = () => {
    if (!user) return '?';
    const firstName = user.name || user.username || '';
    const lastName = user.lastname || '';
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || '?';
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
        return <AdminInicioSection eventsCount={events.length} onNavigate={setActiveSection} />;
      case 'eventos':
        return <AdminEventosSection onOpenModal={handleOpenModal} />;
      case 'usuarios':
        return <AdminUsersSection />;
      case 'perfil':
        return <AdminPerfilSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <AdminEventDetailModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} />
      
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