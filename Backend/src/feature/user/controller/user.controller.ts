import userModel from "../../../model/user.model.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import { sendResponse } from "../../../utils/apiResponse.js";

const getUsers = asyncHandler(async (_req, res) => {
    const users = await userModel
        .find({ role: "user" })
        .select("name email role createdAt")
        .sort({ name: 1 });

    return sendResponse(res, 200, "Users fetched successfully", { users });
});

export default { getUsers };
