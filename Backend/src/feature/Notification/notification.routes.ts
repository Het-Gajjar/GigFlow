import express from "express";
import notificationController from "./controller/notification.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const notificationRouter = express.Router();

notificationRouter.get("/", authenticate, notificationController.getNotifications);
notificationRouter.patch("/read/:id", authenticate, notificationController.markAsRead);
notificationRouter.patch("/read", authenticate, notificationController.markAsRead);

export default notificationRouter;
