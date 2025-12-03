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
  avatar?: string;
  _id?: string;
  id?: string;
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
  clearErrors: () => void;
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

  const clearErrors = () => setErrors([]);

  // Helper para obtener el ID del usuario (maneja tanto _id como id)
  const getUserId = (user: User | null): string | undefined => {
    return user?._id || user?.id;
  };

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
          // Normalizar: si viene 'id', copiarlo a '_id' también
          const userData = res.data;
          if (userData.id && !userData._id) {
            userData._id = userData.id;
          }
          
          setUser(userData);
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
      
      // Normalizar: si viene 'id', copiarlo a '_id' también
      const userData = res.data;
      if (userData.id && !userData._id) {
        userData._id = userData.id;
      }
      
      setUser(userData);
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
      
      // Normalizar: si viene 'id', copiarlo a '_id' también
      const userData = res.data;
      if (userData.id && !userData._id) {
        userData._id = userData.id;
      }
      
      setUser(userData);
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

  const updateUser = async (id: string, data: UpdateUser): Promise<User | null> => {
    try {
      setErrors([]);
      
      if (!id) {
        throw new Error('ID de usuario requerido');
      }

      const res = await updateProfileRequest(id, data);

      // Actualizar el estado del usuario con los datos nuevos
      if (res?.data) {
        // Normalizar: si viene 'id', copiarlo a '_id' también
        const userData = res.data;
        if (userData.id && !userData._id) {
          userData._id = userData.id;
        }
        
        setUser(userData);
        return userData;
      }

      return null;
    } catch (error: any) {
      console.error('updateUser - Error capturado:', error);
      console.error('updateUser - Error response:', error?.response?.data);
      const message = error?.response?.data?.message ?? error?.message ?? 'Error al actualizar perfil';
      const errorArray = Array.isArray(message) ? message : [message];
      setErrors(errorArray);
      throw new Error(errorArray[0]);
    }
  };

  const getProfile = async () => {
    try {
      const res = await profileRequest();
      
      if (res?.data) {
        // Normalizar: si viene 'id', copiarlo a '_id' también
        const userData = res.data;
        if (userData.id && !userData._id) {
          userData._id = userData.id;
        }
        setUser(userData);
      } else {
        console.warn('getProfile - No se recibió data en la respuesta');
      }
    } catch (error) {
      console.error('getProfile - Error al obtener perfil:', error);
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
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};