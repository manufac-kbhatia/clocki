import type { NextFunction, Request, Response } from "express";
import { PrismaUtils } from "@repo/db";

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
  res: Response,
  next: NextFunction
): void => {
  // Default statusCode and message if not provided
  if (err instanceof PrismaUtils.Prisma.PrismaClientKnownRequestError) {
    console.log(
      "-------------------------------------------------------------------------"
    );
    console.log(err);
    console.log(
      "-------------------------------------------------------------------------"
    );
  }
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Send error response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
