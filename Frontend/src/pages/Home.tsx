import HeroCarousel from '../components/heroCarousel';
import ServicesSection from '../components/serviceSection';
import ReviewsSection from '../components/reviewSection';
import FAQSection from '../components/FAQSection';

function HomePage() {
  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Servicios */}
      <ServicesSection />

      {/* Reseñas */}
      <ReviewsSection />

      {/* Preguntas Frecuentes */}
      <FAQSection />
    </div>
  );
}

export default HomePage;