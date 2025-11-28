import { Navigate } from 'react-router';
import { useAuth } from './context/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Mientras se verifica la autenticación, muestra un loader
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

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra el contenido protegido
  return <>{children}</>;
}

export default ProtectedRoute;