import notificationModel from "../../../model/notification.model.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import { sendResponse } from "../../../utils/apiResponse.js";

const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await notificationModel
        .find({ userId: req.user!.id })
        .sort({ createdAt: -1 })
        .limit(50);

    return sendResponse(res, 200, "Notifications fetched successfully", { notifications });
});

const markAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (id === "all") {
        await notificationModel.updateMany({ userId: req.user!.id, read: false }, { read: true });
    } else {
        await notificationModel.updateOne({ _id: id, userId: req.user!.id }, { read: true });
    }

    const notifications = await notificationModel
        .find({ userId: req.user!.id })
        .sort({ createdAt: -1 })
        .limit(50);

    return sendResponse(res, 200, "Notifications updated successfully", { notifications });
});

export default { getNotifications, markAsRead };
