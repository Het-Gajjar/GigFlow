import type { NextFunction, Request, Response } from "express";

const errorMiddleware = (error: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error",
    });
};

export default errorMiddleware;
