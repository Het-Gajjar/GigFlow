

import type { Request, Response } from "express";
import Task from "../../../model/task.model.js";
import userModel from "../../../model/user.model.js";
import taskModel from "../../../model/task.model.js";

const createTask = async (req: Request, res: Response) => {

    try {

        const { title, description, status, assignedTo, deadline } = req.body;
        const createdBy = req.user.id;
        if (!createdBy) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!title || !description || !assignedTo) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const validuser = await userModel.findById(assignedTo);
        if (!validuser) {
            return res.status(404).json({ message: "User not found" });
        }

        const task = await Task.create({
            title,
            description,
            status,
            deadline,
            assignedBy: createdBy,
            assignedTo
        });

        res.status(201).json({ success: true, message: "Task created successfully", task });



    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }



}
const getMyTask = async (req: Request, res: Response) => {
    try {
        const tasks = await taskModel.find({ assignedBy: req.user.id });

        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, status, deadline, assignedTo } = req.body;
        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.deadline = deadline || task.deadline;
        task.assignedTo = assignedTo || task.assignedTo;
        await task.save();
        res.status(200).json({ success: true, message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await task.deleteOne();
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}


export default {
    createTask,
    getMyTask,
    updateTask,
    deleteTask
};