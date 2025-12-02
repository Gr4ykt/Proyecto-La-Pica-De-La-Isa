import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { useAdminEvent } from '../../context/adminContext';

interface AdminEventosSectionProps {
  onOpenModal: (event: any) => void;
}

function AdminEventosSection({ onOpenModal }: AdminEventosSectionProps) {
  const { events, isLoading } = useAdminEvent();

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; bgColor: string }> = {
      init: { label: 'Iniciado', color: '#E5B097', bgColor: 'rgba(229, 176, 151, 0.2)' },
      inProgress: { label: 'En Progreso', color: '#E5B097', bgColor: 'rgba(229, 176, 151, 0.2)' },
      accepted: { label: 'Aprobada', color: 'var(--secondary)', bgColor: 'rgba(122, 155, 126, 0.2)' },
      firstPay: { label: 'Primer Pago', color: 'var(--secondary)', bgColor: 'rgba(122, 155, 126, 0.2)' },
      completed: { label: 'Completado', color: 'var(--secondary)', bgColor: 'rgba(122, 155, 126, 0.2)' },
      cancelled: { label: 'Cancelada', color: '#DC2626', bgColor: 'rgba(220, 38, 38, 0.2)' },
      archived: { label: 'Archivada', color: '#6B7280', bgColor: 'rgba(107, 114, 128, 0.2)' }
    };
    return statusMap[status] || statusMap.init;
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Gestión de Eventos
        </h2>
        <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          Administra todas las solicitudes de eventos
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-4 mx-auto mb-4" 
            style={{ borderColor: 'var(--primary)' }} 
          />
          <p style={{ color: 'var(--text-secondary)' }}>Cargando eventos...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="p-8 rounded-xl text-center" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
          <p className="text-lg">Aún no hay eventos registrados.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event: { status: string; _id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | Date; user: { username: any; }; note: any; firstPay: any; secondPay: any; }) => {
            const statusInfo = getStatusLabel(event.status);

            return (
              <div 
                key={event._id}
                className="p-5 rounded-xl border-l-4 transition-all hover:shadow-lg"
                style={{ 
                  borderColor: statusInfo.color, 
                  backgroundColor: 'var(--background)', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' 
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <div className="flex-1">

                    {/* Título + Estado */}
                    <div className="flex items-center gap-2 mb-2">
                      <h3 
                        className="font-semibold text-lg" 
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {event.title}
                      </h3>

                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: statusInfo.bgColor, color: statusInfo.color }}
                      >
                        {statusInfo.label}
                      </span>
                    </div>

                    {/* Fecha */}
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                      <strong>Fecha:</strong> {formatDate(event.date)}
                    </p>

                    {/* Usuario */}
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                      <strong>Cliente:</strong> {event.user?.username || "Usuario eliminado"}
                    </p>

                    {/* Nota */}
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <strong>Nota:</strong> {event.note || "Sin notas"}
                    </p>

                    {/* Pagos */}
                    {event.firstPay && (
                      <p className="text-xs mt-2 font-semibold" style={{ color: 'var(--secondary)' }}>
                        ✓ Primer pago confirmado
                      </p>
                    )}
                    {event.secondPay && (
                      <p className="text-xs font-semibold" style={{ color: 'var(--secondary)' }}>
                        ✓ Segundo pago confirmado
                      </p>
                    )}
                  </div>

                  {/* Botón → manejar acciones admin */}
                  <button 
                    className="btn-outline btn-sm"
                    onClick={() => onOpenModal(event)}
                  >
                    Ver Detalles
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminEventosSection;