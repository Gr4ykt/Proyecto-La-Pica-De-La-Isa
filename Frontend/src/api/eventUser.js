import axios from "./axiosEvent.js"

export const createEvent = (event) => axios.post("/eventuser", event);
export const updateEvent = (id, event) => axios.put(`/eventuser/${id}`, event);
export const deleteEvent = (id) => axios.delete(`/eventuser/${id}`);

export const getEvents = () => axios.get("/eventusers");
export const getEvent = (id) => axios.get(`/eventuser/${id}`); 