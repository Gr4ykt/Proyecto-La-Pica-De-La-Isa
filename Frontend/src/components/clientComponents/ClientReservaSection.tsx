import { useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react';
import { useEvent } from '../../context/eventContext';

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

function ClientReservaSection() {
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
}

export default ClientReservaSection;