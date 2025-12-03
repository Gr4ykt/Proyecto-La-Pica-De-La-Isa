import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useEvent } from '../context/eventContext';
import { useNavigate } from 'react-router';
import ClientReservaSection from './clientComponents/ClientReservaSection';
import ClientHistorialSection from './clientComponents/ClientHistorialSection';
import ClientPerfilSection from './clientComponents/ClientPerfilSection';
import EventDetailModal from './clientComponents/EventDetailModal';

function DashboardClient() {
  const [activeSection, setActiveSection] = useState('reserva');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, logout, getProfile } = useAuth();
  const { getEvents } = useEvent();
  const navigate = useNavigate();

  // Cargar perfil de usuario y eventos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      await getProfile(); // Cargar perfil del usuario
      getEvents(); // Cargar eventos
    };
    loadData();
  }, []);

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
        return <ClientReservaSection />;
      case 'historial':
        return <ClientHistorialSection onOpenModal={handleOpenModal} />;
      case 'perfil':
        return <ClientPerfilSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <EventDetailModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} />
      
      <div className="flex">
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ backgroundColor: 'var(--primary)' }}>
          <div className="p-6 border-b" style={{ borderColor: 'rgba(245, 241, 232, 0.2)' }}>
            <div className="flex items-center justify-between">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username || 'User'} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }}>
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
              {user?.name || user?.username || ''} {user?.lastname || ''}
            </h3>
            <p className="text-sm opacity-80" style={{ color: 'var(--background)' }}>
              @{user?.username || ''}
            </p>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveSection(item.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === item.id ? 'scale-105' : 'hover:scale-102'}`} style={{ backgroundColor: activeSection === item.id ? 'var(--secondary)' : 'transparent', color: 'var(--background)' }}>
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

export default DashboardClient;