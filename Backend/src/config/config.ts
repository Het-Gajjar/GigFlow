import dotenv from "dotenv";
dotenv.config();


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
}

if (!process.env.PORT) {
    throw new Error("PORT is missing");
}
if (!process.env.CLIENT_URL) {
    throw new Error("CLIENT_URL is missing");
}

interface AppConfig {
    mongo_url: string;
    JWT_SECRET: string;
    PORT: string;
    CLIENT_URL: string;
}

const config: AppConfig = {
    mongo_url: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173"
};

export default config;
