import { useState, useEffect } from 'react';

export default function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0);

  // Reviews de ejemplo (en producción estas vendrían de Google Reviews API)
  const reviews = [
    {
      name: 'María González',
      rating: 5,
      date: 'Hace 2 semanas',
      text: 'Excelente lugar para eventos. Celebramos el cumpleaños de mi hija y todo salió perfecto. El espacio es amplio, limpio y muy bonito. La atención fue impecable.',
      avatar: 'MG'
    },
    {
      name: 'Carlos Ramírez',
      rating: 5,
      date: 'Hace 1 mes',
      text: 'Realizamos nuestra reunión familiar aquí y fue maravilloso. El ambiente campestre es relajante y las instalaciones están en excelente estado. Muy recomendado.',
      avatar: 'CR'
    },
    {
      name: 'Patricia Silva',
      rating: 5,
      date: 'Hace 3 semanas',
      text: 'Hermoso lugar! La pérgola es espaciosa y las áreas verdes son perfectas para que los niños jueguen. El personal muy amable y servicial. Volveremos sin duda.',
      avatar: 'PS'
    },
    {
      name: 'Juan Morales',
      rating: 4,
      date: 'Hace 2 meses',
      text: 'Muy buen lugar para eventos. La ubicación es tranquila y el espacio cumple con lo prometido. Buena relación calidad-precio.',
      avatar: 'JM'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5"
            fill={index < rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: '#FDB022' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section 
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--background)' }}
          >
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p 
            className="text-base sm:text-lg opacity-90"
            style={{ color: 'var(--background)' }}
          >
            Experiencias reales de quienes ya celebraron con nosotros
          </p>
        </div>

        {/* Contenedor del review actual */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="p-6 sm:p-10 rounded-2xl transition-all duration-500"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mb-4"
                style={{ 
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--background)'
                }}
              >
                {reviews[currentReview].avatar}
              </div>

              {/* Nombre y estrellas */}
              <h3 
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {reviews[currentReview].name}
              </h3>

              <div className="flex items-center gap-3 mb-4">
                {renderStars(reviews[currentReview].rating)}
                <span 
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {reviews[currentReview].date}
                </span>
              </div>

              {/* Texto del review */}
              <p 
                className="text-base sm:text-lg leading-relaxed max-w-2xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                "{reviews[currentReview].text}"
              </p>
            </div>
          </div>

          {/* Controles de navegación */}
          <button
            onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: 'var(--secondary)',
              color: 'var(--background)'
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: 'var(--secondary)',
              color: 'var(--background)'
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentReview ? 'w-8 sm:w-10' : ''
              }`}
              style={{ 
                backgroundColor: index === currentReview 
                  ? 'var(--secondary)' 
                  : 'rgba(245, 241, 232, 0.5)'
              }}
            />
          ))}
        </div>

        {/* Badge de Google */}
        <div className="flex justify-center items-center gap-2 mt-8 sm:mt-10">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span 
            className="font-medium text-sm sm:text-base"
            style={{ color: 'var(--background)' }}
          >
            Reseñas verificadas de Google
          </span>
        </div>
      </div>
    </section>
  );
}