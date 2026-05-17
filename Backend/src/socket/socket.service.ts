import type { Server } from "socket.io";
import notificationModel from "../model/notification.model.js";

let io: Server | null = null;
const userSocketMap = new Map<string, string>();

export const initializeSocket = (socketServer: Server) => {
    io = socketServer;

    io.on("connection", (socket) => {
        const userId = socket.handshake.auth?.userId || socket.handshake.query?.userId;

        if (typeof userId === "string" && userId) {
            userSocketMap.set(userId, socket.id);
            socket.join(userId);
        }

        socket.on("disconnect", () => {
            for (const [mappedUserId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(mappedUserId);
                    break;
                }
            }
        });
    });
};

export const createAndEmitNotification = async ({
    userId,
    title,
    message,
}: {
    userId: string;
    title: string;
    message: string;
}) => {
    const notification = await notificationModel.create({ userId, title, message });

    if (io) {
        io.to(userId).emit("notification:new", notification);
    }

    return notification;
};
