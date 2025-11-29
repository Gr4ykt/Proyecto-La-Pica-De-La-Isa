import Map from "../components/map.tsx";
import ContactHero from "../components/contactHero.tsx";

function ContactPage() {
  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >

      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        <ContactHero />
        <Map />
      </main>
    </div>
  );
}

export default ContactPage;