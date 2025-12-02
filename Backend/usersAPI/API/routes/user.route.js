import { Router } from "express";
import { profile, getUsers, updateUser } from "../controllers/user.controller.js"
import { authRequired } from "../middlewares/auth.middlewares.js"
import { isAdmin } from "../middlewares/auth.admin.middlewares.js";

const userRouter = Router();

// USERS
userRouter.get('/profile', authRequired, profile);
userRouter.put('/profile/:id', authRequired, updateUser);

// ADMIN
userRouter.get('/admin/getUsers', authRequired, isAdmin, getUsers);

export default userRouter;