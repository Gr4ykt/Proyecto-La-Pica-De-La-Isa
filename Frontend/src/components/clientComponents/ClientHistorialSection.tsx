import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useEvent } from '../../context/eventContext';

interface ClientHistorialSectionProps {
  onOpenModal: (event: any) => void;
}

function ClientHistorialSection({ onOpenModal }: ClientHistorialSectionProps) {
  const { events, isLoading: eventsLoading } = useEvent();
  const { user } = useAuth();
  const [showBankInfo, setShowBankInfo] = useState(false);

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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copiado al portapapeles`);
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

      {/* Datos Bancarios */}
      <div
        className="p-6 sm:p-8 rounded-xl border-l-4"
        style={{ 
          backgroundColor: 'var(--background)', 
          borderColor: 'var(--primary)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}>
            <svg className="w-5 h-5" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Datos para Transferencia
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
              Realiza tu pago mediante transferencia bancaria a la siguiente cuenta RUT de BancoEstado
            </p>
            
            <button
              onClick={() => setShowBankInfo(!showBankInfo)}
              className="px-4 py-2 rounded-lg transition-all hover:opacity-80 flex items-center gap-2"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}
            >
              {showBankInfo ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  Ocultar Datos
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Mostrar Datos Bancarios
                </>
              )}
            </button>

            {showBankInfo && (
              <div className="mt-4 space-y-3 animate-fadeIn">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(229, 176, 151, 0.1)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Banco
                    </p>
                  </div>
                  <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    BancoEstado - Cuenta RUT
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(229, 176, 151, 0.1)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      RUT
                    </p>
                    <button
                      onClick={() => copyToClipboard('18.456.789-2', 'RUT')}
                      className="text-xs px-2 py-1 rounded hover:opacity-70"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}
                    >
                      Copiar
                    </button>
                  </div>
                  <p className="text-base font-semibold font-mono" style={{ color: 'var(--text-primary)' }}>
                    18.456.789-2
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(229, 176, 151, 0.1)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Nombre de la Cuenta
                    </p>
                    <button
                      onClick={() => copyToClipboard('María Elena González Rojas', 'Nombre')}
                      className="text-xs px-2 py-1 rounded hover:opacity-70"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}
                    >
                      Copiar
                    </button>
                  </div>
                  <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    María Elena González Rojas
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(229, 176, 151, 0.1)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Correo Electrónico
                    </p>
                    <button
                      onClick={() => copyToClipboard('maria.gonzalez@bancoestado.cl', 'Correo')}
                      className="text-xs px-2 py-1 rounded hover:opacity-70"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}
                    >
                      Copiar
                    </button>
                  </div>
                  <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    maria.gonzalez@bancoestado.cl
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Proceso de Reserva - Información Importante */}
      <div
        className="p-6 sm:p-8 rounded-xl border-l-4"
        style={{ 
          backgroundColor: 'var(--background)', 
          borderColor: 'var(--secondary)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--secondary)' }}>
            <svg className="w-5 h-5" style={{ color: 'var(--background)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Proceso de Reserva - Pasos a Seguir
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Una vez que tu solicitud sea aprobada, sigue estos pasos para completar tu reserva:
            </p>
          </div>
        </div>

        <div className="space-y-4 ml-0 sm:ml-13">
          {/* Paso 1 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
              1
            </div>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                Solicitud Aprobada
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Recibirás una notificación por correo electrónico a <strong>{user?.email}</strong> confirmando que tu solicitud ha sido aprobada.
              </p>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
              2
            </div>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                Realizar el Primer Pago
              </h4>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Realiza la transferencia usando los datos bancarios mostrados arriba y envía el comprobante de pago al siguiente número de WhatsApp:
              </p>
              <a 
                href="https://wa.me/56973987505" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-80"
                style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +56 9 7398 7505
              </a>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                <strong>Información a incluir en el mensaje:</strong>
              </p>
              <ul className="text-sm mt-1 ml-4 space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <li>• Comprobante de pago (foto o captura)</li>
                <li>• Fecha del evento</li>
                <li>• Tu correo electrónico: <strong>{user?.email}</strong></li>
              </ul>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
              3
            </div>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                Confirmación y Verificación
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Nuestro equipo verificará tu pago y corroborará la información vigente. Recibirás una confirmación por correo electrónico.
              </p>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
              4
            </div>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                Proceso Completo
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Una vez verificado todo, podrás realizar el segundo pago siguiendo el mismo procedimiento. Tu evento estará completamente confirmado.
              </p>
            </div>
          </div>
        </div>

        {/* Nota Importante */}
        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(229, 176, 151, 0.1)', borderLeft: '3px solid #E5B097' }}>
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            <strong>📌 Importante:</strong> Asegúrate de que el correo electrónico de tu cuenta ({user?.email}) esté correcto, ya que todas las notificaciones se enviarán a esta dirección.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientHistorialSection;