import { useState, useEffect } from 'react';
import { useEvent } from '../../context/eventContext';

interface EventDetailModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const { updateEvent, deleteEvent } = useEvent();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    title: event?.title || '',
    note: event?.note || '',
    date: event?.date ? new Date(event.date).toISOString().split('T')[0] : ''
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        note: event.note,
        date: new Date(event.date).toISOString().split('T')[0]
      });
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateEvent(event._id, formData);
    if (result) {
      setIsEditing(false);
      onClose();
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      setIsDeleting(true);
      const result = await deleteEvent(event._id, { isDeleted: true });
      if (result) {
        onClose();
      }
      setIsDeleting(false);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      init: 'Iniciado',
      inProgress: 'En Progreso',
      accepted: 'Aprobada',
      firstPay: 'Primer Pago',
      completed: 'Completado',
      cancelled: 'Cancelada',
      archived: 'Archivada'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--background)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Detalles de la Reserva
            </h2>
            <button onClick={onClose} className="p-2 rounded-lg transition-all hover:scale-110" style={{ color: 'var(--text-secondary)' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  Título del Evento
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  Fecha del Evento
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  Descripción / Notas
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border resize-none"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">Guardar Cambios</button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn-outline flex-1">Cancelar</button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Título</h3>
                  <p className="text-lg" style={{ color: 'var(--text-primary)' }}>{event.title}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Fecha</h3>
                  <p className="text-lg" style={{ color: 'var(--text-primary)' }}>{formatDate(event.date)}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Estado</h3>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }}>
                    {getStatusLabel(event.status)}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Descripción</h3>
                  <p style={{ color: 'var(--text-primary)' }}>{event.note}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Primer Pago</h3>
                    <p style={{ color: event.firstPay ? 'var(--secondary)' : 'var(--text-secondary)' }}>
                      {event.firstPay ? '✓ Realizado' : '✗ Pendiente'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Segundo Pago</h3>
                    <p style={{ color: event.secondPay ? 'var(--secondary)' : 'var(--text-secondary)' }}>
                      {event.secondPay ? '✓ Realizado' : '✗ Pendiente'}
                    </p>
                  </div>
                </div>

                <div className="text-xs pt-2" style={{ color: 'var(--text-secondary)' }}>
                  <p>Creado: {new Date(event.createdAt).toLocaleString('es-CL')}</p>
                  <p>Última actualización: {new Date(event.updatedAt).toLocaleString('es-CL')}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setIsEditing(true)} className="btn-primary flex-1">
                  Editar
                </button>
                <button 
                  onClick={handleDelete} 
                  disabled={isDeleting}
                  className="btn-outline flex-1"
                  style={{ 
                    borderColor: '#DC2626',
                    color: '#DC2626'
                  }}
                >
                  {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailModal;