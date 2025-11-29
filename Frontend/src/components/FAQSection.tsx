import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Cuál es la capacidad máxima del lugar?',
      answer: 'Nuestro centro de eventos tiene capacidad para hasta 150 personas cómodamente. Incluimos mesas, sillas y espacio de circulación adecuado para que todos tus invitados disfruten del evento.'
    },
    {
      question: '¿Qué está incluido en el arriendo?',
      answer: 'El arriendo incluye el uso de la pérgola techada, áreas verdes, mesas, sillas, sistema de sonido básico, iluminación, baños y estacionamiento. También ofrecemos apoyo en la coordinación del evento.'
    },
    {
      question: '¿Puedo llevar mi propia decoración y catering?',
      answer: 'Sí, puedes traer tu propia decoración y el servicio de catering de tu preferencia. Te ayudamos con el montaje y desmontaje. También contamos con proveedores recomendados si los necesitas.'
    },
    {
      question: '¿Cuál es el horario de funcionamiento?',
      answer: 'Estamos disponibles de 9:00 AM a 11:00 PM todos los días. Puedes elegir el horario que mejor se adapte a tu evento, con paquetes de medio día o día completo.'
    },
    {
      question: '¿Con cuánto tiempo de anticipación debo reservar?',
      answer: 'Recomendamos reservar con al menos 30 días de anticipación, especialmente para fines de semana y fechas festivas. Sin embargo, siempre revisamos disponibilidad para fechas más cercanas.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos transferencias bancarias, efectivo y tarjetas de crédito/débito. Se requiere un abono del 50% para confirmar la reserva y el saldo restante se paga el día del evento.'
    },
    {
      question: '¿Tienen estacionamiento?',
      answer: 'Sí, contamos con amplio estacionamiento gratuito para todos los asistentes de tu evento. El espacio está dentro del recinto y es seguro.'
    },
    {
      question: '¿Qué pasa si necesito cancelar mi reserva?',
      answer: 'Manejamos una política de cancelación flexible. Si cancelas con más de 15 días de anticipación, se reembolsa el 80% del abono. Consulta nuestros términos completos al momento de reservar.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Preguntas Frecuentes
          </h2>
          <p 
            className="text-base sm:text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            Resolvemos tus dudas más comunes
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border-2 overflow-hidden transition-all duration-300"
              style={{ 
                borderColor: openIndex === index ? 'var(--primary)' : 'var(--border)',
                backgroundColor: 'var(--background)'
              }}
            >
              {/* Pregunta */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors duration-300"
                style={{ 
                  backgroundColor: openIndex === index ? 'var(--primary)' : 'transparent'
                }}
              >
                <span 
                  className="font-semibold text-base sm:text-lg"
                  style={{ 
                    color: openIndex === index ? 'var(--background)' : 'var(--text-primary)'
                  }}
                >
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ 
                    color: openIndex === index ? 'var(--background)' : 'var(--text-primary)'
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Respuesta */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div 
                  className="px-6 py-4 sm:px-8 sm:py-5 border-t"
                  style={{ 
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--background)'
                  }}
                >
                  <p 
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA al final */}
        <div className="text-center mt-12 sm:mt-16">
          <a href="/contact">
          <p 
            className="text-base sm:text-lg mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            ¿Tienes alguna otra pregunta?
          </p>
          <button className="btn-secondary btn-lg">
            Contáctanos
          </button>
          </a>
        </div>
      </div>
    </section>
  );
}