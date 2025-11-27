import { Router } from "express";
import { authRequired } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/auth.admin.middlewares.js";

import {
  getEventuser,      // Obtener UN evento específico
  getEventusers,     // Obtener TODOS los eventos del usuario
  eventUpdateusers,
  deleteEventusers,
  createEventusers,
  hello
} from "../controllers/event.user.controller.js";

import {
  getEvent, 
  getEvents, 
  deleteEvent, 
  updateEvent,
  // Pruebas
  gEs, 
  cEt, 
  dE
} from "../controllers/event.admin.controller.js";

const router = Router();

// ============================================================================
// RUTAS DE USUARIO (requieren autenticación)
// ============================================================================

router.get('/hello', hello);

// CORREGIDO: Rutas en el orden correcto
router.get("/eventusers", authRequired, getEventusers);           // Obtener TODOS (plural sin ID)
router.get("/eventuser/:id", authRequired, getEventuser);         // Obtener UNO (singular con ID)
router.post("/eventuser", authRequired, createEventusers);        // Crear evento
router.put("/eventuser/:id", authRequired, eventUpdateusers);     // Actualizar evento
router.delete("/eventuser/:id", authRequired, deleteEventusers);  // Eliminar evento

// ============================================================================
// RUTAS DE ADMIN (requieren autenticación + permisos admin)
// ============================================================================

router.get("/admin/events", authRequired, isAdmin, getEvents);         // Obtener todos
router.get("/admin/event/:id", authRequired, isAdmin, getEvent);       // Obtener uno
router.put("/admin/event/:id", authRequired, isAdmin, updateEvent);    // Actualizar
router.delete("/admin/event/:id", authRequired, isAdmin, deleteEvent); // Eliminar

// ============================================================================
// RUTAS DE PRUEBA (solo en modo test)
// ============================================================================

if (process.env.NODE_ENV === "test") {
    router.get("/test", gEs);           // Obtener eventos de prueba
    router.post("/test", cEt);          // Crear evento de prueba
    router.delete("/test/:id", dE);     // Eliminar evento de prueba
}

// ============================================================================
// HEALTH CHECK
// ============================================================================

router.get("/health", (req, res) => res.status(200).json({ message: "OK" }));

export default router;