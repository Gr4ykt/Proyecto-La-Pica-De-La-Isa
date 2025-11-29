import { createContext, useContext, useState } from 'react';
import { 
  createEvent as createEventApi,
  updateEvent as updateEventApi,
  deleteEvent as deleteEventApi,
  getEvents as getEventsApi,
  getEvent as getEventApi
} from '../api/eventUser';

export const EVENT_STATUSES = [
  "init", "inProgress", "accepted", "firstPay", "completed", "cancelled", "archived"
] as const;

export type EventStatus = typeof EVENT_STATUSES[number];

interface Event {
  _id: string;
  title: string;
  note: string;
  date: Date | string;
  user: string;
  status: EventStatus;
  isDeleted: boolean;
  deletedAt: Date | string | null;
  firstPay: boolean;
  secondPay: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateEventData {
  title: string;
  note: string;
  date: Date | string;
}

interface UpdateEventData {
  title?: string;
  note?: string;
  date?: Date | string;
  status?: EventStatus;
  firstPay?: boolean;
  secondPay?: boolean;
}

interface EventContextType {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  errors: string[];
  createEvent: (data: CreateEventData) => Promise<Event | null>;
  updateEvent: (id: string, data: UpdateEventData) => Promise<Event | null>;
  deleteEvent: (id: string) => Promise<boolean>;
  getEvents: () => Promise<void>;
  getEvent: (id: string) => Promise<void>;
  clearErrors: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const clearErrors = () => setErrors([]);

  const createEvent = async (data: CreateEventData): Promise<Event | null> => {
    try {
      setErrors([]);
      setIsLoading(true);
      const res = await createEventApi(data);
      
      // Agregar el nuevo evento a la lista
      setEvents((prev) => [...prev, res.data]);
      
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) 
          ? error.response.data.message 
          : [error.response.data.message]);
      } else {
        setErrors(['Error al crear el evento']);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvent = async (id: string, data: UpdateEventData): Promise<Event | null> => {
    try {
      setErrors([]);
      setIsLoading(true);
      const res = await updateEventApi(id, data);
      
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
      await deleteEventApi(id);
      
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
      const res = await getEventsApi();
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
      const res = await getEventApi(id);
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

  return (
    <EventContext.Provider
      value={{
        events,
        currentEvent,
        isLoading,
        errors,
        createEvent,
        updateEvent,
        deleteEvent,
        getEvents,
        getEvent,
        clearErrors,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};