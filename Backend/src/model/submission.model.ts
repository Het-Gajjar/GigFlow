import mongoose, { type InferSchemaType, type HydratedDocument } from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "task",
            required: true,
        },
        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        fileUrl: {
            type: String,
            default: "",
        },
        comments: {
            type: String,
            default: "",
        },
        feedback: {
            type: String,
            default: "",
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["pending", "reviewed", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export type Submission = InferSchemaType<typeof submissionSchema>;
export type SubmissionDocument = HydratedDocument<Submission>;

const submissionModel = mongoose.model<Submission>("submission", submissionSchema);

export default submissionModel;
