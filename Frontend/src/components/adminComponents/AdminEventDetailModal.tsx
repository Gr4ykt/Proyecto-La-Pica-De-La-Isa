import { useState, useEffect } from 'react';
import { useAdminEvent } from '../../context/adminContext';

interface AdminEventDetailModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

function AdminEventDetailModal({ event, isOpen, onClose }: AdminEventDetailModalProps) {
  const { updateEvent, deleteEvent } = useAdminEvent();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    title: event?.title || '',
    note: event?.note || '',
    date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
    status: event?.status || 'init',
    firstPay: event?.firstPay || false,
    secondPay: event?.secondPay || false
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        note: event.note,
        date: new Date(event.date).toISOString().split('T')[0],
        status: event.status,
        firstPay: event.firstPay,
        secondPay: event.secondPay
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
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.')) {
      setIsDeleting(true);
      const result = await deleteEvent(event._id);
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

  const getUserFullName = () => {
    if (event.user?.name && event.user?.lastname) {
      return `${event.user.name} ${event.user.lastname}`;
    }
    return event.user?.username || 'Usuario desconocido';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--background)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Gestión de Evento (Admin)
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
                  Estado del Evento
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                >
                  <option value="init">Iniciado</option>
                  <option value="inProgress">En Progreso</option>
                  <option value="accepted">Aprobada</option>
                  <option value="firstPay">Primer Pago</option>
                  <option value="completed">Completado</option>
                  <option value="cancelled">Cancelada</option>
                  <option value="archived">Archivada</option>
                </select>
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

              <div className="space-y-3">
                <label className="block font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  Estado de Pagos
                </label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.firstPay}
                      onChange={(e) => setFormData({ ...formData, firstPay: e.target.checked })}
                      className="w-5 h-5 rounded cursor-pointer"
                      style={{ accentColor: 'var(--secondary)' }}
                    />
                    <span style={{ color: 'var(--text-primary)' }}>Primer Pago Realizado</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.secondPay}
                      onChange={(e) => setFormData({ ...formData, secondPay: e.target.checked })}
                      className="w-5 h-5 rounded cursor-pointer"
                      style={{ accentColor: 'var(--secondary)' }}
                    />
                    <span style={{ color: 'var(--text-primary)' }}>Segundo Pago Realizado</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">Guardar Cambios</button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn-outline flex-1">Cancelar</button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }}>
                  <h3 className="font-semibold mb-1">Información del Cliente</h3>
                  <p className="text-lg font-medium">{getUserFullName()}</p>
                  <p className="text-sm opacity-90">@{event.user?.username}</p>
                  <p className="text-sm opacity-90">{event.user?.email}</p>
                </div>

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
                  Editar Evento
                </button>
                <button 
                  onClick={handleDelete} 
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all"
                  style={{ 
                    backgroundColor: '#DC2626',
                    color: 'white',
                    opacity: isDeleting ? 0.5 : 1
                  }}
                >
                  {isDeleting ? 'Eliminando...' : 'Eliminar Evento'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminEventDetailModal;