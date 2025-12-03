import { useEffect } from 'react';
import { useAdminEvent } from '../../context/adminContext';

interface AdminInicioSectionProps {
  eventsCount: number;
  onNavigate: (section: string) => void;
}

function AdminInicioSection({ eventsCount, onNavigate }: AdminInicioSectionProps) {
  const { users, getUsers, events, getEvents } = useAdminEvent();

  useEffect(() => {
    // Cargar usuarios y eventos al montar el componente
    getUsers();
    if (events.length === 0) {
      getEvents();
    }
  }, []);

  // Calcular eventos pendientes (init o inProgress)
  const pendingEventsCount = events.filter(
    event => event.status === 'init' || event.status === 'inProgress'
  ).length;

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
              <p className="text-2xl font-bold" style={{ color: 'var(--secondary)' }}>
                {events.length > 0 ? events.length : eventsCount}
              </p>
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
              <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{users.length}</p>
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
              <p className="text-2xl font-bold" style={{ color: '#E5B097' }}>{pendingEventsCount}</p>
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
          <button 
            onClick={() => onNavigate('eventos')} 
            className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105" 
            style={{ backgroundColor: 'var(--background)', color: 'var(--primary)' }}
          >
            Ver Eventos
          </button>
          <button 
            onClick={() => onNavigate('usuarios')} 
            className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105" 
            style={{ backgroundColor: 'var(--background)', color: 'var(--primary)' }}
          >
            Ver Usuarios
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminInicioSection;