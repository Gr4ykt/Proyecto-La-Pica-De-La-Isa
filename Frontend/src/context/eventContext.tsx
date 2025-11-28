import { createContext, useState, useContext, useEffect } from "react";

import {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEvent
} from '../api/eventUser'

export const eventContext = createContext();



