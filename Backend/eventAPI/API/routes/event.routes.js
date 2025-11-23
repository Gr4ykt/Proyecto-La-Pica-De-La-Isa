import { Router } from "express";
import { authRequired } from "../middlewares/auth.middlewares.js";


import {
  getEventuser,
  getEventusers,
  eventUpdateusers,
  deleteEventusers,
  createEventusers,
  hello
} from "../controllers/event.user.controller.js";


import {
  getEvent, getEvents, deleteEvent, updateEvent,
  //pruebas
  gEs, cEt, dE
} from "../controllers/event.admin.controller.js";


const router = Router();

router.get('/hello', hello);

router.get("/eventuse",            authRequired, getEventuser);
router.get("/eventuse/:id",        authRequired, getEventusers);
router.put("/eventupdateuse/:id",  authRequired, eventUpdateusers);
router.delete("/deleteeventuser/:id", authRequired, deleteEventusers);
router.post("/createeventuser/:id",   authRequired, createEventusers);

router.get("/getEvent",        authRequired, getEvent);
router.get("/gerEvents",       authRequired, getEvents);
router.put("/updateEvent/:id", authRequired, updateEvent);
router.delete("/deleteEvent/:id", authRequired, deleteEvent);

//pruebas
if (process.env.NODE_ENV === "test") {
    router.get("/", gEs);
    router.post("/", cEt);
    router.delete("/:id", dE);
}  

router.get("/health", (req,res)=>res.status(200).json({ message:"OK" }));

export default router;
