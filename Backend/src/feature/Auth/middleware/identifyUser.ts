import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../../config/config.js";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const identifyUser = (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, config.JWT_SECRET);

        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default identifyUser;