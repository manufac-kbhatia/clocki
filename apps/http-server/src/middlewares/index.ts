import { ErrorResponse } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils";
import { client, PrismaUtils } from "@repo/db";

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
    const employee = await client.employee.findUnique({
      where: {
        id: decoded.id as number,
      },
    });
    req.employee = employee;
    next();
  } else {
    res.status(403).json({
      error: "Unauthorized",
    });
  }
}

export function isAuthorized(roles: PrismaUtils.Role[]) {
  return (req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    const role = req.employee?.role;
    if (role !== undefined && roles.includes(role)) {
      next();
    } else {
      res.status(403).json({
        error: "Unauthorized",
      });
    }
  };
}

export async function isMe(
  req: Request<{ id: string }>,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  if (req.employee?.id === id) {
    next();
  } else {
    res.status(403).json({
      error: "Unauthorized",
    });
  }
}
