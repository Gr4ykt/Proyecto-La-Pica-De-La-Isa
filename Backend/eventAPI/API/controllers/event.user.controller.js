import Event from "../models/event.models.js";

export const hello = async (req, res) => {
  res.status(200);
  res.json({"message":"Hello World from EVENT API"});
};

export const getEventusers = async(req,res) =>{
    const eventuser = await Event.find({
        user: req.user.id,
        isDeleted: false,
    }).populate('user');
    res.json(eventuser);
};
export const createEventusers = async(req,res)=>{
    const {title,note,date} =req.body;
    if(!title || !date){
      res.status(400).json({message:"Formulario mal armado"})
    }
    const newEventuser = new Event({
        title,
        note:note || "",
        date,
        user: req.user.id,
        status:"init",
    })
    const savedEventuser= await newEventuser.save();
    res.json(savedEventuser)
};
export const getEventuser = async (req, res) => {
  const eventuse = await Event.findOne({
    _id: req.params.id,
    user: req.user.id,
    isDeleted: false,
  }).populate("user");
  if (!eventuse) return res.status(404).json({ message: "Event not found" });
  res.json(eventuse);
};
export const eventUpdateusers = async (req, res) => {
  const eventupdate = await Event.findOne({ 
    _id: req.params.id,
    user: req.user.id,
    isDeleted: false 
    });
  if (!eventupdate) return res.status(404).json({ message: "Event not found" });

  if (["completed","archived","cancelled"].includes(eventupdate.status)) {
    return res.status(409).json({ message: `No se puede cancelar en estado ${eventupdate.status}` });
  }

  ev.status = "cancelled";
  await ev.save();
  res.json(eventupdate);
};

export const deleteEventusers = async (req, res) =>{
    const eventdelete = await Event.findOne({
    _id: req.params.id,
    user: req.user.id,
    isDeleted: false,
  });
  if (!eventdelete) return res.status(404).json({ message: "Event not found" });

  eventdelete.isDeleted = true;
  eventdelete.deletedAt = new Date();
  await eventdelete.save();

  return res.sendStatus(204);
};
