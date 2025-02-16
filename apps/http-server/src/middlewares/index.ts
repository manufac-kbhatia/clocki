import { ErrorResponse } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils";

export async function isAuthenticated(
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const token = (req.cookies as { token?: string }).token;
  if (typeof token !== "string") {
    res.status(403).json({
      error: "Unauthorized",
    });
    return;
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (decoded && typeof decoded !== "string") {
    req.employeeId = decoded.id;
    next();
  } else {
    res.status(403).json({
      error: "Unauthorized",
    });
  }
}
