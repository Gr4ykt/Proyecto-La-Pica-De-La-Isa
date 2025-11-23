//pruebas
import dotenv from 'dotenv';


if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' }); // .env.test en la raíz de eventAPI
} else {
  dotenv.config(); 
}
dotenv.config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const MONGO_URL = process.env.MONGO_URL;
