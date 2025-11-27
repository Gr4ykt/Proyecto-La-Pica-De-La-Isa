import Event from "../models/event.models.js";

// ============================================================================
// CONTROLADORES ADMIN (requieren permisos de administrador)
// ============================================================================

// Obtener todos los eventos (admin)
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      isDeleted: false
    }).populate("user");
    res.json(events);
  } catch (error) {
    console.error("Error en getEvents:", error);
    res.status(500).json({ message: "Error al obtener eventos" });
  }
};

// Obtener un evento específico (admin)
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      isDeleted: false
    }).populate("user");
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    res.json(event);
  } catch (error) {
    console.error("Error en getEvent:", error);
    res.status(500).json({ message: "Error al obtener evento" });
  }
};

// Eliminar evento (admin) - soft delete
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      isDeleted: false
    });
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.isDeleted = true;
    event.deletedAt = new Date();
    await event.save();

    res.json(event);
  } catch (error) {
    console.error("Error en deleteEvent:", error);
    res.status(500).json({ message: "Error al eliminar evento" });
  }
};

// Actualizar estado de evento (admin)
export const updateEvent = async (req, res) => {
  try {
    const { status, title, note, date, firstPay, secondPay } = req.body;
    
    const event = await Event.findOne({
      _id: req.params.id,
      isDeleted: false
    });
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Actualizar campos proporcionados
    if (status !== undefined) event.status = status;
    if (title !== undefined) event.title = title;
    if (note !== undefined) event.note = note;
    if (date !== undefined) event.date = date;
    if (firstPay !== undefined) event.firstPay = firstPay;
    if (secondPay !== undefined) event.secondPay = secondPay;

    await event.save();
    res.json(event);
  } catch (error) {
    console.error("Error en updateEvent:", error);
    res.status(500).json({ message: "Error al actualizar evento" });
  }
};

// ============================================================================
// CONTROLADORES DE PRUEBA (solo en modo test)
// ============================================================================

// Crear evento de prueba
export const cEt = async (req, res) => {
  if (process.env.NODE_ENV !== "test") {
    return res.status(403).json({ message: "Endpoint solo disponible en modo test" });
  }

  try {
    const { title, note, date, user } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    // Crear documento directamente para pruebas
    const doc = {
      title,
      note: note || "",
      date: date ? new Date(date) : new Date(),
      user: user || null,
      status: "init",
      firstPay: false,
      secondPay: false,
      isDeleted: false,
    };

    const { insertedId } = await Event.collection.insertOne(doc);

    return res.status(201).json({
      id: insertedId.toString(),
      title: doc.title,
      note: doc.note,
      date: doc.date,
      user: doc.user,
      status: doc.status,
    });
  } catch (err) {
    console.error("[create test event] error:", err);
    return res.status(500).json({ message: "Error al crear evento de prueba", error: err.message });
  }
};

// Obtener eventos de prueba
export const gEs = async (req, res) => {
  if (process.env.NODE_ENV !== "test") {
    return res.status(403).json({ message: "Endpoint solo disponible en modo test" });
  }

  try {
    const events = await Event.find().sort({ _id: -1 }).lean();
    
    const data = events.map(e => ({
      id: e._id.toString(),
      title: e.title,
      note: e.note,
      date: e.date,
      user: e.user?.toString() || null,
      status: e.status,
      firstPay: e.firstPay,
      secondPay: e.secondPay,
      isDeleted: e.isDeleted,
    }));
    
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error en gEs:", error);
    return res.status(500).json({ message: "Error al obtener eventos de prueba" });
  }
};

// Eliminar evento de prueba (hard delete)
export const dE = async (req, res) => {
  if (process.env.NODE_ENV !== "test") {
    return res.status(403).json({ message: "Endpoint solo disponible en modo test" });
  }

  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    return res.sendStatus(204);
  } catch (error) {
    console.error("Error en dE:", error);
    return res.status(500).json({ message: "Error al eliminar evento de prueba" });
  }
};