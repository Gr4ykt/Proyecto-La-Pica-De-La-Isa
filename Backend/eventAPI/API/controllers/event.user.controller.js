import Event from "../models/event.models.js";

export const hello = async (req, res) => {
  res.status(200);
  res.json({ message: "Hello World from EVENT API" });
};

// Obtener TODOS los eventos del usuario autenticado
export const getEventusers = async (req, res) => {
  try {
    const eventuser = await Event.find({
      user: req.user.id,
      isDeleted: false,
    }).populate('user');
    res.json(eventuser);
  } catch (error) {
    console.error("Error en getEventusers:", error);
    res.status(500).json({ message: "Error al obtener eventos" });
  }
};

// Crear un nuevo evento
export const createEventusers = async (req, res) => {
  try {
    const { title, note, date, status, firstPay, secondPay } = req.body;
    
    // Validación
    if (!title || !date) {
      return res.status(400).json({ message: "Title y date son obligatorios" });
    }

    const newEventuser = new Event({
      title,
      note: note || "",
      date,
      user: req.user.id,
      status: status || "init",
      firstPay: firstPay || false,
      secondPay: secondPay || false,
    });

    const savedEventuser = await newEventuser.save();
    res.status(201).json(savedEventuser);
  } catch (error) {
    console.error("Error en createEventusers:", error);
    res.status(500).json({ message: "Error al crear evento", error: error.message });
  }
};

// Obtener UN evento específico del usuario
export const getEventuser = async (req, res) => {
  try {
    const eventuse = await Event.findOne({
      _id: req.params.id,
      user: req.user.id,
      isDeleted: false,
    }).populate("user");
    
    if (!eventuse) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    res.json(eventuse);
  } catch (error) {
    console.error("Error en getEventuser:", error);
    res.status(500).json({ message: "Error al obtener evento" });
  }
};

// Actualizar un evento del usuario
export const eventUpdateusers = async (req, res) => {
  try {
    const { title, note, date, status, firstPay, secondPay } = req.body;
    
    const eventupdate = await Event.findOne({
      _id: req.params.id,
      user: req.user.id,
      isDeleted: false
    });
    
    if (!eventupdate) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Validar que no se pueda editar eventos en estados finales
    if (["completed", "archived", "cancelled"].includes(eventupdate.status)) {
      return res.status(409).json({ 
        message: `No se puede actualizar evento en estado ${eventupdate.status}` 
      });
    }

    // Actualizar solo los campos proporcionados
    if (title !== undefined) eventupdate.title = title;
    if (note !== undefined) eventupdate.note = note;
    if (date !== undefined) eventupdate.date = date;
    if (status !== undefined) eventupdate.status = status;
    if (firstPay !== undefined) eventupdate.firstPay = firstPay;
    if (secondPay !== undefined) eventupdate.secondPay = secondPay;

    await eventupdate.save();
    res.json(eventupdate);
  } catch (error) {
    console.error("Error en eventUpdateusers:", error);
    res.status(500).json({ message: "Error al actualizar evento" });
  }
};

// Eliminar (soft delete) un evento del usuario
export const deleteEventusers = async (req, res) => {
  try {
    const eventdelete = await Event.findOne({
      _id: req.params.id,
      user: req.user.id,
      isDeleted: false,
    });
    
    if (!eventdelete) {
      return res.status(404).json({ message: "Event not found" });
    }

    eventdelete.isDeleted = true;
    eventdelete.deletedAt = new Date();
    await eventdelete.save();

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error en deleteEventusers:", error);
    res.status(500).json({ message: "Error al eliminar evento" });
  }
};