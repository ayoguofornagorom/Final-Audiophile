// The main entry point of our Express srever.
// this file.
// 1. create the express application
// 2. Sets up middleware (CORS, JSON parsing, logging)
// 3. Register all routes
// 4. connects to MongoDB
// 5. Starts listening for HTTP requests

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

//load environment variables from .env file
//Must be called BEFORE any code that uses process.env
dotenv.config();

//create an express application
const app = express();

//-------MIDDLEWARE SETUP--------
// Middleware are functions that run on every request before your routes

// CORS: Allow requests from any origin
// origin: true reflects the request origin, which works with credentials
app.use(
  cors({
    origin: true,
    credentials: true, // Allows cookies and authorization headers
  }),
);

// parse incoming JSON request bodies
// limit: 10mb allows base64 images uploads in the req.body
app.use(express.json({ limit: "10mb" }));

// parse URL-encoded form data (e.g from HTML forms)
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//Simple request logger - logs every incoming request
// Useful for debugging in development
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next(); // Always call next() to continue processing
});

//-------ROUTES REGISTERATION
// Tell express which routes to use and what URL prefix they start with

// Authentication Routes /api/auth/register
app.use("/api/auth", authRoutes);

//product routes: /api/auth/register
app.use("/api/products", productRoutes);

//Order routes: /api/orders
app.use("/api/orders", orderRoutes);

//Admin routes: api/admin/users etc
app.use("/api/admin", adminRoutes);

// Health check - a simple endpoint to verify the server is running
// Used by development platforms (like render) to check server health
app.get("/api/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "Audiophile server is running!",
    timeStamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// 404 HANDLER - catches any resquest

// Error handler - Must be the LAST middleware
//Express recognises it is an error handler because it has 4 parameters (err, req, res, next)
app.use(errorHandler);

// ------START SERVER--------
// COnnect to MongoDB first, then start listening for requests. We do this because we want to make sure the database is connected before we start accepting requests that may need to access the database.

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port: ${PORT}`);
      console.log(`🌎 Environment ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 Health check: http//localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.log("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandle promises rejections (catches async errors not caught by try/catch)
process.on("unhandledRejection", (reason: Error) => {
  console.error("Unhandled Promise Rejection:", reason.message);
  process.exit(1);
});

startServer();

export default app;

// https://final-audiophile-sigma.vercel.app/
// https://final-audiophile-tpkx.onrender.com
