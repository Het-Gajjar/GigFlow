import express from "express";
import userController from "./controller/user.controller.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/", authenticate, authorize("admin"), userController.getUsers);

export default userRouter;
