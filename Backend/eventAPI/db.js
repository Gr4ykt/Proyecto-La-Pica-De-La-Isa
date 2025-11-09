import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

let memoryServer = null;

export const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const uri = memoryServer.getUri('eventapi_test');
      await mongoose.connect(uri);
    } else {
      await mongoose.connect(MONGO_URL, { authSource: "admin" });
    }
    console.log("[*] DB conectada");
  } catch (error) {
    console.error("[!] Error de conexión a MongoDB:", error);
    throw error;
  }
};

//prueba
export const clearDB = async () => {
  if (mongoose.connection.readyState !== 1) return; // no conectado, salir
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
};
