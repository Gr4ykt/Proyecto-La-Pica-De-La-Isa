import { createContext, useContext, useState, useEffect } from 'react';
import { 
  registerRequest, 
  loginRequest, 
  logoutRequest, 
  profileRequest, 
  verifyTokenRequest,
  updateProfileRequest
} from '../api/auth';

interface User {
  avatar: string | undefined;
  _id: string;
  username?: string;
  name?: string;
  lastname?: string;
  email?: string;
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

interface UpdateUser {
  username?: string;
  name?: string;
  lastname?: string;
  email?: string;
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
  updateUser: (id: string, data: UpdateUser) => Promise<User | null>;
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

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest();
        if (res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch {
        setUser(null);
        setIsAuthenticated(false);
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
      const message = error?.response?.data?.message ?? error?.message ?? 'Error al registrar usuario';
      setErrors(Array.isArray(message) ? message : [message]);
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
      const message = error?.response?.data?.message ?? error?.message ?? 'Error al iniciar sesión';
      setErrors(Array.isArray(message) ? message : [message]);
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

  // ---- updateUser corregido ----
  const updateUser = async (id: string, data: UpdateUser): Promise<User | null> => {
    try {
      if (!id) throw new Error('Falta el id del usuario');

      const res = await updateProfileRequest(id, data);

      // si la API devuelve el usuario actualizado en res.data, lo seteamos
      if (res?.data) {
        setUser(res.data);
        return res.data;
      }

      return null;
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? 'Error al actualizar usuario';
      // opcional: guardar en errores del contexto
      setErrors(prev => (message ? [...prev, message] : prev));
      throw new Error(message);
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
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
