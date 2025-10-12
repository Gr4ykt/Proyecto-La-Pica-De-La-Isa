import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        trim: true 
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: { 
        type: String,
        required: true 
    },
    role: {
        type: String,
        required: true
    },
    googleId: {
    type: String,
    allowNull: true, // This field will only be populated for OAuth users
    },
    avatar: { type: String },
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema);