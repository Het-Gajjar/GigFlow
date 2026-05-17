import express from 'express';
import connectDB from './config/Db.js';
import dotenv from "dotenv";
import authRouter from './feature/Auth/Auth.routes.js';
import leadRouter from './feature/Lead/lead.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

connectDB();
app.use("/api/auth", authRouter);
app.use("/api/task", leadRouter);

export default app; 