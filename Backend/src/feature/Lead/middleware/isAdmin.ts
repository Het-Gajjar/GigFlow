

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../../config/config.js";

const checkAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "No token provided",
            });
        }

        const decodedToken = jwt.verify(
            token,
            config.JWT_SECRET
        ) as jwt.JwtPayload;

        if (!decodedToken) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        if (decodedToken.role !== "admin") {
            return res.status(403).json({
                message: "Forbidden",
            });
        }

        req.user = decodedToken;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token",
        });

    }
};

export default checkAdmin;