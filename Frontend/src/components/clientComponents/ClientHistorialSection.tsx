import { useEvent } from '../../context/eventContext';

interface ClientHistorialSectionProps {
  onOpenModal: (event: any) => void;
}

function ClientHistorialSection({ onOpenModal }: ClientHistorialSectionProps) {
  const { events, isLoading: eventsLoading } = useEvent();

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
          Historial de Solicitudes
        </h2>
        <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          Revisa el estado de tus reservas
        </p>
      </div>

      {eventsLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 mx-auto mb-4" style={{ borderColor: 'var(--primary)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Cargando eventos...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="p-8 rounded-xl text-center" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
          <p className="text-lg">No tienes eventos registrados aún.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event: any) => {
            const statusInfo = getStatusLabel(event.status);
            return (
              <div key={event._id} className="p-5 rounded-xl border-l-4 transition-all hover:shadow-lg" style={{ borderColor: statusInfo.color, backgroundColor: 'var(--background)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: statusInfo.bgColor, color: statusInfo.color }}>{statusInfo.label}</span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                      <strong>Fecha:</strong> {formatDate(event.date)}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <strong>Nota:</strong> {event.note}
                    </p>
                    {event.firstPay && (
                      <p className="text-xs mt-2 font-semibold" style={{ color: 'var(--secondary)' }}>✓ Primer pago realizado</p>
                    )}
                    {event.secondPay && (
                      <p className="text-xs font-semibold" style={{ color: 'var(--secondary)' }}>✓ Segundo pago realizado</p>
                    )}
                  </div>
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

export default ClientHistorialSection;