import express from "express";
import taskController from "./controller/task.controller.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";

const taskRouter = express.Router();

taskRouter.get("/myTask", authenticate, taskController.getTasks);
taskRouter.post("/create", authenticate, authorize("admin"), taskController.createTask);
taskRouter.put("/:id", authenticate, authorize("admin"), taskController.updateTask);
taskRouter.delete("/:id", authenticate, authorize("admin"), taskController.deleteTask);
taskRouter.patch("/:id/status", authenticate, taskController.updateTaskStatus);

export default taskRouter;
