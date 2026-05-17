import Task from "../../../model/task.model.js";
import userModel from "../../../model/user.model.js";
import ApiError from "../../../utils/ApiError.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import { sendResponse } from "../../../utils/apiResponse.js";
import { createAndEmitNotification } from "../../../socket/socket.service.js";

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

export default { createTask, getTasks, updateTaskStatus };
