import express from "express";
import authController from "./controller/auth.controller.js";
import { registerValidation } from "./validation/register.validation.js";
import { loginValidation } from "./validation/login.validation.js";
import { validate } from "./middleware/validation.js";

const authRouter = express.Router();


authRouter.post('/register', registerValidation, validate, authController.registerUser);
authRouter.post('/login', loginValidation, validate, authController.loginUser);


export default authRouter;