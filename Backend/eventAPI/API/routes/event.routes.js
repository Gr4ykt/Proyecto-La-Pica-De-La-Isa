import { Router } from "express";
import { authRequired } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/auth.admin.middlewares.js";


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

router.get('/hello', authRequired, isAdmin, hello);

router.get("/eventuser", authRequired, getEventuser);
router.get("/eventuser/:id", authRequired, getEventusers);
router.put("/eventupdateuser/:id", authRequired, eventUpdateusers);
router.delete("/deleteeventuser/:id", authRequired, deleteEventusers);
router.post("/createeventuser/:id", authRequired, createEventusers);

router.get("/getEvent", authRequired, isAdmin,getEvent);
router.get("/gerEvents", authRequired, isAdmin, getEvents);
router.put("/updateEvent/:id", authRequired, isAdmin, updateEvent);
router.delete("/deleteEvent/:id", authRequired, isAdmin, deleteEvent);

//pruebas
if (process.env.NODE_ENV === "test") {
    router.get("/", gEs);
    router.post("/", cEt);
    router.delete("/:id", dE);
}  

router.get("/health", (req,res)=>res.status(200).json({ message:"OK" }));

export default router;
