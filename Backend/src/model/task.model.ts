import mongoose, { type InferSchemaType, type HydratedDocument } from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },

        dueDate: {
            type: Date,
            required: true,
        },

        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        submission: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "submission",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export type Task = InferSchemaType<typeof taskSchema>;
export type TaskDocument = HydratedDocument<Task>;

const taskModel = mongoose.model<Task>("task", taskSchema);

export default taskModel;
