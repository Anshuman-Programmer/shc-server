import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Initialize the database connection
connectDB();

// Create an instance of Express
const app: Application = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors());

// Set up the routes
app.use("/api/auth", authRoutes);

// Simple health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

// Export the app for testing or other integrations
export default app;
