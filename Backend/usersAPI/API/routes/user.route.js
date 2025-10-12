import { Router } from "express";
import { profile } from "../controllers/user.controller.js"
import { authRequired } from "../middlewares/auth.middlewares.js"

const userRouter = Router();

userRouter.get('/profile', authRequired, profile);

export default userRouter;