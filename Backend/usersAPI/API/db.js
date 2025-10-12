import mongoose from "mongoose";
import { MONGO_URL } from "./config.js"

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            authSource: "admin" // importante para auth con root
        });
        console.log("[*] DB conectada");
    } catch (error) {
        console.error("[!] Error de conexión a MongoDB:", error);
    }
};