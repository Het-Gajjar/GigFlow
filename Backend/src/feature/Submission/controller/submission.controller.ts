import Task from "../../../model/task.model.js";
import submissionModel from "../../../model/submission.model.js";
import ApiError from "../../../utils/ApiError.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import { sendResponse } from "../../../utils/apiResponse.js";
import { createAndEmitNotification } from "../../../socket/socket.service.js";

const submissionPopulate = [
    { path: "submittedBy", select: "name email" },
    { path: "taskId", select: "title description assignedBy assignedTo", populate: [
        { path: "assignedBy", select: "name email" },
        { path: "assignedTo", select: "name email" },
    ] },
];

const createSubmission = asyncHandler(async (req, res) => {
    const { taskId, description, fileUrl, comments } = req.body;

    if (!taskId || !description) {
        throw new ApiError(400, "Task and work description are required");
    }

    const task = await Task.findOne({ _id: taskId, assignedTo: req.user!.id });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const uploadedPath = req.file ? `/uploads/${req.file.filename}` : "";
    const finalFileUrl = uploadedPath || fileUrl || "";

    if (!finalFileUrl) {
        throw new ApiError(400, "Upload a file or provide a file URL");
    }

    const submission = await submissionModel.create({
        taskId,
        submittedBy: req.user!.id,
        description,
        fileUrl: finalFileUrl,
        comments,
    });

    task.submission = submission._id;
    await task.save();

    await createAndEmitNotification({
        userId: String(task.assignedBy),
        title: "New task submission",
        message: "A user submitted work for review",
    });

    const populatedSubmission = await submissionModel.findById(submission._id).populate(submissionPopulate);

    return sendResponse(res, 201, "Submission created successfully", { submission: populatedSubmission });
});

const getSubmissions = asyncHandler(async (_req, res) => {
    const submissions = await submissionModel
        .find()
        .populate(submissionPopulate)
        .sort({ submittedAt: -1 });

    return sendResponse(res, 200, "Submissions fetched successfully", { submissions });
});

const reviewSubmission = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, feedback = "" } = req.body;

    if (!["reviewed", "approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid review status");
    }

    const submission = await submissionModel.findById(id);

    if (!submission) {
        throw new ApiError(404, "Submission not found");
    }

    submission.status = status;
    submission.feedback = feedback;
    await submission.save();

    await createAndEmitNotification({
        userId: String(submission.submittedBy),
        title: `Submission ${status}`,
        message: `Your submission has been ${status}`,
    });

    const populatedSubmission = await submissionModel.findById(submission._id).populate(submissionPopulate);

    return sendResponse(res, 200, "Submission reviewed successfully", { submission: populatedSubmission });
});

export default { createSubmission, getSubmissions, reviewSubmission };
