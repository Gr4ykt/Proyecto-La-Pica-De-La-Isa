import axios from "./axiosEvent.js"

export const updateEventAdmin = (id, event) => axios.put(`/admin/event/${id}`, event);
export const deleteEventAdmin = (id) => axios.delete(`/admin/event/${id}`);

export const getEventAdmin = (id) => axios.get(`/admin/event/${id}`);
export const getEventsAdmin = () => axios.get('/admin/events');