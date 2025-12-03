import { createContext, useContext, useState } from 'react';
import { 
  updateEventAdmin as updateEventAdminApi,
  deleteEventAdmin as deleteEventAdminApi,
  getEventAdmin as getEventAdminApi,
  getEventsAdmin as getEventsAdminApi
} from '../api/eventAdmin';
import { getUsersRequestAdmin } from '../api/auth';

export const EVENT_STATUSES = [
  "init", "inProgress", "accepted", "firstPay", "completed", "cancelled", "archived"
] as const;

export type EventStatus = typeof EVENT_STATUSES[number];

interface Event {
  _id: string;
  title: string;
  note: string;
  date: Date | string;
  user: {
    _id: string;
    username: string;
    name?: string;
    lastname?: string;
    email: string;
  };
  status: EventStatus;
  isDeleted: boolean;
  deletedAt: Date | string | null;
  firstPay: boolean;
  secondPay: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  username: string;
  name?: string;
  lastname?: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UpdateEventData {
  title?: string;
  note?: string;
  date?: Date | string;
  status?: EventStatus;
  firstPay?: boolean;
  secondPay?: boolean;
  isDeleted?: boolean;
}

interface AdminEventContextType {
  events: Event[];
  currentEvent: Event | null;
  users: User[];
  isLoading: boolean;
  errors: string[];
  updateEvent: (id: string, data: UpdateEventData) => Promise<Event | null>;
  deleteEvent: (id: string) => Promise<boolean>;
  getEvents: () => Promise<void>;
  getEvent: (id: string) => Promise<void>;
  getUsers: () => Promise<void>;
  clearErrors: () => void;
}

const AdminEventContext = createContext<AdminEventContextType | undefined>(undefined);

export const useAdminEvent = () => {
  const context = useContext(AdminEventContext);
  if (!context) {
    throw new Error('useAdminEvent must be used within an AdminEventProvider');
  }
  return context;
};

export const AdminEventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const clearErrors = () => setErrors([]);

  const updateEvent = async (id: string, data: UpdateEventData): Promise<Event | null> => {
    try {
      setErrors([]);
      setIsLoading(true);
      const res = await updateEventAdminApi(id, data);
      
      // Actualizar el evento en la lista
      setEvents((prev) => 
        prev.map((event) => event._id === id ? res.data : event)
      );
      
      // Actualizar el evento actual si es el mismo
      if (currentEvent?._id === id) {
        setCurrentEvent(res.data);
      }
      
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) 
          ? error.response.data.message 
          : [error.response.data.message]);
      } else {
        setErrors(['Error al actualizar el evento']);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      setErrors([]);
      setIsLoading(true);
      await deleteEventAdminApi(id);
      
      // Remover el evento de la lista
      setEvents((prev) => prev.filter((event) => event._id !== id));
      
      // Limpiar el evento actual si es el mismo
      if (currentEvent?._id === id) {
        setCurrentEvent(null);
      }
      
      return true;
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) 
          ? error.response.data.message 
          : [error.response.data.message]);
      } else {
        setErrors(['Error al eliminar el evento']);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getEvents = async () => {
    try {
      setErrors([]);
      setIsLoading(true);
      const res = await getEventsAdminApi();
      setEvents(res.data);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) 
          ? error.response.data.message 
          : [error.response.data.message]);
      } else {
        setErrors(['Error al obtener los eventos']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getEvent = async (id: string) => {
    try {
      setErrors([]);
      setIsLoading(true);
      const res = await getEventAdminApi(id);
      setCurrentEvent(res.data);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) 
          ? error.response.data.message 
          : [error.response.data.message]);
      } else {
        setErrors(['Error al obtener el evento']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setErrors([]);
      setIsLoading(true);
      const res = await getUsersRequestAdmin();
      setUsers(res.data);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) 
          ? error.response.data.message 
          : [error.response.data.message]);
      } else {
        setErrors(['Error al obtener los usuarios']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminEventContext.Provider
      value={{
        events,
        currentEvent,
        users,
        isLoading,
        errors,
        updateEvent,
        deleteEvent,
        getEvents,
        getEvent,
        getUsers,
        clearErrors,
      }}
    >
      {children}
    </AdminEventContext.Provider>
  );
};