import Event from "../models/event.models.js";


export const getEvents = async(req,res)=>{
    const events = await Event.find({
        isDeleted:false}).populate("user")
        res.json(events)
};

export const getEvent = async(req,res)=>{
    const event= await Event.findById(req.params.id)
    if (!event) return res.status(404).json({message:"Event no found"})
    res.json(event)
};
export const deleteEvent = async(req,res)=>{
    const event= await Event.findById(req.params.id)
    if (!event) return res.status(404).json({message:"Event no found"})

    event.isDeleted = true;
    event.deletedAt = new Date();
    await event.save();

    res.json(event)
};
export const updateEvent = async(req,res)=>{
    const { status } = req.body;//
    const event= await Event.findById(req.params.id)
    if (!event) return res.status(404).json({message:"Event no found"})
    event.status = status;
    await event.save();
    res.json(event);
};  

//pruebas

export const cEt = async (req, res) => {
  const { name, date, location } = req.body;
  if (!name) return res.status(400).json({ message: "El nombre es obligatorio" });

  try {
    if (process.env.NODE_ENV === "test") {
    
      const doc = {
        name,                                            
        date: date ? new Date(date) : null,
        location: location ?? null,
      };
      const { insertedId } = await Event.collection.insertOne(doc);

      return res.status(201).json({
        id: insertedId.toString(),
        name: doc.name,
        date: doc.date,
        location: doc.location,
      });
    }

    
    const ev = new Event({ name, date, location });
    await ev.save();
    return res.status(201).json({
      id: ev._id.toString(),
      name: ev.name,   
      date: ev.date,
      location: ev.location,
    });

  } catch (err) {
    console.error("[create test event] error:", err);
    return res.status(500).json({ message: "create failed", error: err.message });
  }
};

export const gEs = async (req, res) => {
  const events = await Event.find().sort({ _id: -1 }).lean();
  const data = events.map(e => ({
    id: e._id.toString(),
    name: e.name ?? e.title ?? e.eventName ?? e.nombre ?? null,
    date: e.date ?? e.eventDate ?? null,
    location: e.location ?? e.place ?? null,
  }));
  return res.status(200).json(data);
};
export const dE = async (req, res) => {
  const { id } = req.params;
  const deleted = await Event.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: "Event no found" });
  return res.status(204).send();
};
