import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils";
import { client } from "@repo/db";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "@repo/schemas/rest";
import type { Role } from "@repo/schemas";

export async function isAuthenticated(req: Request, res: Response<ErrorResponse>, next: NextFunction) {
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
        id: decoded.id,
      },
      omit: {
        password: true,
      },
    });
    if (employee === null) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }
    req.employee = employee;
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }
}

export function isAuthorized(roles: Role[]) {
  return (req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    const role = req.employee?.role as Role;
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
