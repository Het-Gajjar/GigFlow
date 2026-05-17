import express from "express";
import submissionController from "./controller/submission.controller.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import { uploadSubmissionFile } from "../../middleware/upload.middleware.js";

const submissionRouter = express.Router();

submissionRouter.post("/create", authenticate, authorize("user"), uploadSubmissionFile, submissionController.createSubmission);
submissionRouter.get("/", authenticate, authorize("admin"), submissionController.getSubmissions);
submissionRouter.patch("/:id/review", authenticate, authorize("admin"), submissionController.reviewSubmission);

export default submissionRouter;
