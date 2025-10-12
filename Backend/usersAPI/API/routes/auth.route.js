import { Router } from "express";
import { hello, login, logout, register, verifyToken } from "../controllers/auth.controllers.js";
import { googleCallback, googleLogin } from "../controllers/google.auth.controllers.js"

const authRouter = Router();

// AUTH GOOGLE
authRouter.get('/google', googleLogin);
authRouter.get('/google/callback', googleCallback);

//AUTH USER
authRouter.get('/hello', hello);
authRouter.post('/register',register);
authRouter.post('/login', login);
authRouter.get('/verify', verifyToken);
authRouter.post('/logout', logout);


export default authRouter;