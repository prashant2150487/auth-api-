import express from "express";
import dotenv from "dotenv";
import { connectDatabase, sequelize } from "./src/config/db.js";
import app from "./src/app.js"

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDatabase();
        await sequelize.sync({ alter: true });
        app.listen(PORT, HOST, () => {
            console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
            console.log(`📊 Health check: http://${HOST}:${PORT}/health`);
            console.log(`🔐 Auth endpoints: http://${HOST}:${PORT}/api/auth`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
