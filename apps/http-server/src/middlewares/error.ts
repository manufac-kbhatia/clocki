import type { Request, Response } from "express";

// Define a custom error class if needed (optional, but useful)
class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message || "Internal Server Error";
  }
}

// The error-handling middleware function
const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response
): void => {
  // Default statusCode and message if not provided
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Send error response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
