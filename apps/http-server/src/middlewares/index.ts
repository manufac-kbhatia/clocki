import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../utils";
import { client } from "@repo/db";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "@repo/schemas/rest";
import type { Role } from "@repo/schemas";

export async function isAuthenticated(req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const authHeader = req.headers["Authorization"];
  if (authHeader === undefined) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  if (typeof authHeader === "string") {
    const token = authHeader.split(" ")[1];

    if (typeof token === "string") {
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as Record<string, string>;
      req.employeeId = decoded.id;
      next();
    }
  }
}

export function isAuthorized(roles: Role[]) {
  return (req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    const role = req.role;
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
