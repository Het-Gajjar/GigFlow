import fs from "fs";
import path from "path";
import multer from "multer";
import type { Request } from "express";
import ApiError from "../utils/ApiError.js";

const uploadDir = path.resolve("src/uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
    "application/zip",
    "application/x-zip-compressed",
];

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const safeBase = path
            .basename(file.originalname, extension)
            .replace(/[^a-z0-9]/gi, "-")
            .toLowerCase();
        cb(null, `${Date.now()}-${safeBase}${extension}`);
    },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new ApiError(400, "Only pdf, doc, docx, png, jpg, jpeg, and zip files are allowed"));
    }

    return cb(null, true);
};

export const uploadSubmissionFile = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
}).single("file");
