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

const config = {
    mongo_url: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
};

export default config;
