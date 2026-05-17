import express from 'express';
import connectDB from './config/Db.js';
import dotenv from "dotenv";
import authRouter from './feature/Auth/Auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";
import taskRouter from './feature/Task/task.routes.js';
import userRouter from './feature/user/user.routes.js';
import submissionRouter from './feature/Submission/submission.routes.js';
import notificationRouter from './feature/Notification/notification.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve("src/uploads")));

connectDB();
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/submissions", submissionRouter);
app.use("/api/notifications", notificationRouter);
app.use(errorMiddleware);

export default app; 
