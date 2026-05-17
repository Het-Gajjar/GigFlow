import Task from "../../../model/task.model.js";
import userModel from "../../../model/user.model.js";
import ApiError from "../../../utils/ApiError.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import { sendResponse } from "../../../utils/apiResponse.js";
import { createAndEmitNotification } from "../../../socket/socket.service.js";
import mongoose from "mongoose";

const taskPopulate = [
    { path: "assignedTo", select: "name email" },
    { path: "assignedBy", select: "name email" },
    { path: "submission" },
];

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status = "pending", assignedTo, priority = "medium", dueDate } = req.body;

    if (!title || !description || !assignedTo || !dueDate) {
        throw new ApiError(400, "Title, description, assigned user, and due date are required");
    }

    const assignedUser = await userModel.findOne({ _id: assignedTo, role: "user" }).select("name email");

    if (!assignedUser) {
        throw new ApiError(404, "Assigned user not found");
    }

    const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        assignedBy: req.user!.id,
        assignedTo,
    });

    const populatedTask = await Task.findById(task._id).populate(taskPopulate);

    await createAndEmitNotification({
        userId: assignedTo,
        title: "New task assigned",
        message: "New task assigned by Admin",
    });

    return sendResponse(res, 201, "Task created successfully", { task: populatedTask });
});

const getTasks = asyncHandler(async (req, res) => {
    const filter = req.user!.role === "admin" ? {} : { assignedTo: req.user!.id };

    const tasks = await Task.find(filter)
        .populate(taskPopulate)
        .sort({ createdAt: -1 });

    return sendResponse(res, 200, "Tasks fetched successfully", { tasks });
});

const updateTaskStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "in-progress", "completed"].includes(status)) {
        throw new ApiError(400, "Invalid task status");
    }

    const filter = req.user!.role === "admin" ? { _id: id } : { _id: id, assignedTo: req.user!.id };
    const task = await Task.findOne(filter);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    task.status = status;
    await task.save();

    const populatedTask = await Task.findById(task._id).populate(taskPopulate);
    const notifyUserId = req.user!.role === "admin" ? String(task.assignedTo) : String(task.assignedBy);

    await createAndEmitNotification({
        userId: notifyUserId,
        title: "Task status updated",
        message: `Task status updated to ${status}`,
    });

    return sendResponse(res, 200, "Task status updated successfully", { task: populatedTask });
});

const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status, assignedTo, priority, dueDate } = req.body;

    if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid task ID");
    }

    if (!title && !description && !status && !assignedTo && !priority && !dueDate) {
        throw new ApiError(400, "At least one field is required to update a task");
    }

    if (status && !["pending", "in-progress", "completed"].includes(status)) {
        throw new ApiError(400, "Invalid task status");
    }

    if (priority && !["low", "medium", "high"].includes(priority)) {
        throw new ApiError(400, "Invalid task priority");
    }

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const previousAssignedTo = String(task.assignedTo);

    if (assignedTo) {
        if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
            throw new ApiError(400, "Invalid assigned user ID");
        }

        const assignedUser = await userModel.findOne({ _id: assignedTo, role: "user" }).select("_id");

        if (!assignedUser) {
            throw new ApiError(404, "Assigned user not found");
        }

        task.assignedTo = assignedTo;
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    const populatedTask = await Task.findById(task._id).populate(taskPopulate);

    const currentAssignedTo = String(task.assignedTo);
    await createAndEmitNotification({
        userId: currentAssignedTo,
        title: previousAssignedTo !== currentAssignedTo ? "Task assigned to you" : "Task updated",
        message: previousAssignedTo !== currentAssignedTo
            ? "A task has been assigned to you by Admin"
            : "An assigned task was updated by Admin",
    });

    return sendResponse(res, 200, "Task updated successfully", { task: populatedTask });
});

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid task ID");
    }

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const assignedTo = String(task.assignedTo);
    await task.deleteOne();

    await createAndEmitNotification({
        userId: assignedTo,
        title: "Task deleted",
        message: "An assigned task was deleted by Admin",
    });

    return sendResponse(res, 200, "Task deleted successfully", { taskId: id });
});

export default { createTask, deleteTask, getTasks, updateTask, updateTaskStatus };
