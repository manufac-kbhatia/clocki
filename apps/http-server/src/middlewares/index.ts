import { ErrorResponse } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils";
import { client, PrismaUtils } from "@repo/db";
import { StatusCodes } from "http-status-codes";

export async function isAuthenticated(
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const token = (req.cookies as { token?: string }).token;
  if (typeof token !== "string") {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (decoded && typeof decoded !== "string") {
    const employee = await client.employee.findUnique({
      where: {
        id: decoded.id as number,
      },
    });
    req.employee = employee;
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }
}

export function isAuthorized(roles: PrismaUtils.Role[]) {
  return (req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    const role = req.employee?.role;
    if (role !== undefined && roles.includes(role)) {
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }
  };
}
