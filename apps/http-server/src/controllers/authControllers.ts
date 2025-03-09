import { client } from "@repo/db";
import { LoginSchema } from "@repo/schemas";
import { LoginEmployeeResponse, LoginPayload } from "@repo/schemas/rest";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { getJWTTokens } from "../utils/jwt";

export const login = async (req: Request<unknown, unknown, LoginPayload>, res: Response, next: NextFunction) => {
  const payload = req.body;
  const parseResult = LoginSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }

  const data = parseResult.data;
  const employee = await client.employee.findUnique({
    where: {
      email: data.email,
    }
  });

  if (employee === null) {
    next(new ErrorHandler("Employee with this email not found", StatusCodes.NOT_FOUND));
    return;
  }
  if (employee.password !== data.password) {
    next(new ErrorHandler("Invalid credentials", StatusCodes.FORBIDDEN));
    return;
  }

  const { accessToken, refreshToken } = getJWTTokens({ id: employee.id, role: employee.role });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ accessToken });
};
