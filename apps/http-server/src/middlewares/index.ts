import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../utils";
import { client } from "@repo/db";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "@repo/schemas/rest";
import type { Role } from "@repo/schemas";
import ErrorHandler from "../utils/errorHandler";

export async function isAuthenticated(req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
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
        const employee = await client.employee.findUnique({
          where: { id: decoded.id },
          include: { createdOrganisation: true },
        });
        if (employee === null) {
          next(new ErrorHandler("User not found", StatusCodes.NOT_FOUND));
          return;
        }
        req.employeeId = decoded.id;
        req.role = decoded.role as Role;
        req.employee = employee;
        next();
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ErrorHandler(error.message, StatusCodes.UNAUTHORIZED));
      return;
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
