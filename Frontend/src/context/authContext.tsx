import { createContext, useContext, useState, useEffect } from 'react';
import { 
  registerRequest, 
  loginRequest, 
  logoutRequest, 
  profileRequest, 
  verifyTokenRequest 
} from '../api/auth';

interface User {
  _id: string;
  username: string;
  name?: string;
  lastname?: string;
  email: string;
  role: string;
  googleId?: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
  name?: string;
  lastname?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  errors: string[];
  signup: (data: RegisterData) => Promise<void>;
  signin: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  getProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  // Limpiar errores después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest();
        if (res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  const signup = async (data: RegisterData) => {
    try {
      setErrors([]);
      const res = await registerRequest(data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) 
          ? error.response.data.message 
          : [error.response.data.message]);
      } else {
        setErrors(['Error al registrar usuario']);
      }
      throw error;
    }
  };

  const signin = async (data: LoginData) => {
    try {
      setErrors([]);
      const res = await loginRequest(data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) 
          ? error.response.data.message 
          : [error.response.data.message]);
      } else {
        setErrors(['Error al iniciar sesión']);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest({});
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const getProfile = async () => {
    try {
      const res = await profileRequest();
      setUser(res.data);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        errors,
        signup,
        signin,
        logout,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};