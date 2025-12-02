import User from "../models/user.model.js"

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "User not found"});
    return res.json({
        id: userFound.id,
        username: userFound.username,
        name: userFound.name,
        lastname: userFound.lastname,
        email: userFound.email,
        role: userFound.role,
        created: userFound.createdAt
    })
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try{
        const user = await User.find({role:"Client"})
        res.json(user)
    }catch(error){
        return res.status(500).json({"message": error.message})
    }
}