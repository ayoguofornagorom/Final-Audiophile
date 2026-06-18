// Global error handler for the express application
// When any route throws an error, express passes it here
// This gives us a single place to format and send error responses.

// Usage: any async error thrown in a route handler will automatically be caught if use "next(error)" or if you wrap with asyncHandler.

import { Request, Response, NextFunction } from "express";

// Custom error class so we can attach a status code to our errors
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message); // call the parent Error class constructor
    this.statusCode = statusCode;
    this.isOperational = true; // Marks this as a "known" operational error

    // Captures the stack trace (helps with debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}

// The main error handler - express recognize it has 4 parameters (err, req, res, next)
export const errorHandler = (
  err: any, // We use "any" here because errors can be many types
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Make a copy of the error so we don't mutate the original
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  // ----Handle specific Mongoose errors----

  // CastError: When mongoDB gets an invalid ID format (not a valid ObjectID)
  // e.g., /api/products/not-a-real-id
  if (err.name === "CastError") {
    message = "Resource not found - invalid ID";
    statusCode = 404;
  }

  // Duplicate key error: e.g, trying to register with an email already used
  if (err.code === 11000) {
    // Extract the field name from the error (e.g "email")
    const field = Object.keys(err.keyValue || {})[0];
    message = `Duplicate value: ${field} alrready exists`;
    statusCode = 400;
  }

  //   MOngoose validation error: e.g, missingrequired field
  if (err.name === "ValidationError") {
    // collect all validatiion error messages into one string
    message = Object.values(err.errors)
      .map((e: any) => e.message)
      .join(", ");
    statusCode = 400;
  }

  //   JWT token errors
  if (err.name === "JsonWebTokenError") {
    message = "Token has expired - Please, log in again";
    statusCode = 401;
  }

  // Send the errors response
  res.status(statusCode).json({
    success: false,
    message,
    // ONly show the full stack trace in development (not in production)
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

// Helper to wrap async route handlers - catches promise rejections automatically
// Without this, unhandled promise rejections creash the server
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
