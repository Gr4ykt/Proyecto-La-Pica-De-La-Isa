import { useState, useEffect } from 'react';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/Images/Imagen6.webp',
      title: 'Tu Evento Perfecto',
      subtitle: 'En el corazón del campo'
    },
    {
      image: '/Images/Imagen8.webp',
      title: 'Espacios Únicos',
      subtitle: 'Para momentos inolvidables'
    },
    {
      image: '/Images/Imagen9.webp',
      title: 'Naturaleza y Comodidad',
      subtitle: 'Todo lo que necesitas en un solo lugar'
    },
    {
      image: '/Images/Imagen7.webp',
      title: 'Celebra con Nosotros',
      subtitle: 'Hacemos realidad tus sueños'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('services-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(42, 37, 32, 0.5)' }}
          />
        </div>
      ))}

      {/* Contenido */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 max-w-4xl">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 transition-all duration-500"
            style={{ color: 'var(--background)' }}
          >
            {slides[currentSlide].title}
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 opacity-90"
            style={{ color: 'var(--background)' }}
          >
            {slides[currentSlide].subtitle}
          </p>
          <button 
            className="btn-primary btn-lg"
            onClick={scrollToNext}
          >
            Descubre Más
          </button>
        </div>
      </div>

      {/* Controles de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ 
          backgroundColor: 'var(--primary)',
          color: 'var(--background)'
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ 
          backgroundColor: 'var(--primary)',
          color: 'var(--background)'
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 sm:w-10' : ''
            }`}
            style={{ 
              backgroundColor: index === currentSlide 
                ? 'var(--primary)' 
                : 'rgba(245, 241, 232, 0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
}