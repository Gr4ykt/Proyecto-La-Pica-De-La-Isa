import { useState, useEffect, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react';
import { useAuth } from '../context/authContext';
import { useEvent } from '../context/eventContext';
import { useNavigate } from 'react-router';

// Componente de formulario de reserva
function ReservaForm() {
  const { createEvent, errors, clearErrors } = useEvent();
  const [formData, setFormData] = useState({
    title: '',
    note: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    clearErrors();

    const result = await createEvent(formData);
    
    if (result) {
      setSuccess(true);
      setFormData({ title: '', note: '', date: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6 sm:p-8 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
      <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
        Formulario de Reserva
      </h3>

      {success && (
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(122, 155, 126, 0.2)', color: 'var(--secondary)' }}>
          <p className="font-semibold">¡Reserva creada exitosamente!</p>
          <p className="text-sm mt-1">Tu solicitud ha sido enviada y está pendiente de aprobación.</p>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)', color: '#DC2626' }}>
          {errors.map((error: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
            <p key={index} className="text-sm">{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
            Título del Evento *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border transition-colors"
            style={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
            placeholder="Ej: Cumpleaños de María, Reunión Familiar, etc."
          />
        </div>

        <div>
          <label htmlFor="date" className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
            Fecha del Evento *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-lg border transition-colors"
            style={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        <div>
          <label htmlFor="note" className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
            Descripción / Notas *
          </label>
          <textarea
            id="note"
            name="note"
            required
            value={formData.note}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
            style={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
            placeholder="Describe tu evento: tipo de celebración, número aproximado de invitados, servicios adicionales que necesitas, horario aproximado, etc."
          />
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--background)'
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud de Reserva'}
          </button>
        </div>

        <div className="pt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(122, 155, 126, 0.1)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            <strong>Nota:</strong> Tu solicitud será revisada por nuestro equipo. Te contactaremos a la brevedad para confirmar la disponibilidad y coordinar los detalles de tu evento.
          </p>
        </div>
      </form>
    </div>
  );
}

// Modal de detalles del evento
function EventDetailModal({ event, isOpen, onClose }: { event: any; isOpen: boolean; onClose: () => void }) {
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

function DashboardClient() {
  const [activeSection, setActiveSection] = useState('reserva');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, logout } = useAuth();
  const { events, getEvents, isLoading: eventsLoading } = useEvent();
  const navigate = useNavigate();

  useEffect(() => {
    getEvents();
  }, []);

  const handleOpenModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    getEvents(); // Recargar eventos después de cerrar el modal
  };

  if (!user) return null;

  const getInitials = () => {
    const firstName = user.name || user.username;
    const lastName = user.lastname || '';
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

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
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Nueva Reserva
              </h2>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                Solicita una fecha para tu evento en nuestro centro campestre
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-6 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--background)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Horarios</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Disponible de 9:00 AM a 11:00 PM todos los días
                </p>
              </div>
              <div className="p-6 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: 'var(--secondary)', backgroundColor: 'var(--background)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--secondary)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Capacidad</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Hasta 150 personas cómodamente
                </p>
              </div>
              <div className="p-6 rounded-xl border-2 transition-all hover:scale-105 sm:col-span-2 lg:col-span-1" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--background)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Servicios</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Pérgola, área verde, mesas y sillas incluidas
                </p>
              </div>
            </div>

            <ReservaForm />
          </div>
        );

      case 'historial':
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
                {events.map((event: { status: string; _id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | Date; note: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; firstPay: any; secondPay: any; }) => {
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
                          onClick={() => handleOpenModal(event)}
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

      case 'perfil':
        const firstName = user.name || '';
        const lastName = user.lastname || '';
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Mi Perfil</h2>
            </div>

            <div className="p-6 sm:p-8 rounded-xl" style={{ backgroundColor: 'var(--primary)' }}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover" />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold" style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }}>
                    {getInitials()}
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--background)' }}>
                    {user.name || user.username} {user.lastname || ''}
                  </h3>
                  <p className="text-sm opacity-90 mb-3" style={{ color: 'var(--background)' }}>@{user.username}</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Información Personal</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Nombre</label>
                    <input type="text" defaultValue={firstName || ''} className="w-full px-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Apellido</label>
                    <input type="text" defaultValue={lastName || ''} className="w-full px-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
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
      <EventDetailModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} />
      
      <div className="flex">
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ backgroundColor: 'var(--primary)' }}>
          <div className="p-6 border-b" style={{ borderColor: 'rgba(245, 241, 232, 0.2)' }}>
            <div className="flex items-center justify-between">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full object-cover" />
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
              {user.name || user.username} {user.lastname || ''}
            </h3>
            <p className="text-sm opacity-80" style={{ color: 'var(--background)' }}>@{user.username}</p>
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