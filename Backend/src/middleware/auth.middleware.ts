import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: "admin" | "user";
            };
        }
    }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
    const cookieToken = req.cookies?.token;
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;
    const token = cookieToken || bearerToken;

    if (!token) {
        return next(new ApiError(401, "Authentication required"));
    }

    try {
        req.user = jwt.verify(token, config.JWT_SECRET) as NonNullable<Express.Request["user"]>;
        return next();
    } catch {
        return next(new ApiError(401, "Invalid or expired token"));
    }
};

export const authorize = (...roles: Array<"admin" | "user">) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ApiError(401, "Authentication required"));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, "You are not allowed to perform this action"));
        }

        return next();
    };
};
