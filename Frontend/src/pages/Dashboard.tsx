import { useAuth } from '../context/authContext';
import DashboardClient from '../components/dashboardClient';
import DashboardAdmin from '../components/dashboardAdmin';

function DashboardPage() {
  const { user, isLoading } = useAuth();

  // Mostrar loader mientras carga
  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4"
            style={{ borderColor: 'var(--primary)' }}
          />
          <p 
            className="text-lg font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no mostrar nada (ProtectedRoute maneja esto)
  if (!user) return null;

  // Renderizar dashboard según el rol
  if (user.role === 'Administrator') {
    return <DashboardAdmin />;
  }else{
    return <DashboardClient />;
  }
}

export default DashboardPage;