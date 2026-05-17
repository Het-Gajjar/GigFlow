import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import { initializeSocket } from "./src/socket/socket.service.js";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    },
});

initializeSocket(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
