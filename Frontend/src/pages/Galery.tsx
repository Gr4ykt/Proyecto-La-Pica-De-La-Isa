import GaleryComponent from "../components/gallery";

function GaleryPage() {
  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        <GaleryComponent />
      </main>
    </div>
  );
}

export default GaleryPage;