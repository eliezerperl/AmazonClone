import express from "express";
import expressAsyncHandler from "express-async-handler";
import { signin, signup } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post('/signup', expressAsyncHandler(signup));
userRouter.post('/signin', expressAsyncHandler(signin));

export default userRouter;