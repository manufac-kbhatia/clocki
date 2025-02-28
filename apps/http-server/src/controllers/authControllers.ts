import { client, Prisma } from "@repo/db";
import { LoginSchema } from "@repo/schemas";
import { LoginEmployeeResponse, LoginPayload } from "@repo/schemas/rest";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";

export const login = async (
  req: Request<unknown, unknown, LoginPayload>,
  res: Response<LoginEmployeeResponse>,
  next: NextFunction,
) => {
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
    },
  });
  if (employee === null) {
    next(new ErrorHandler("Employee with this email not found", StatusCodes.NOT_FOUND));
    return;
  }
  if (employee.password !== data.password) {
    next(new ErrorHandler("Invalid credentials", StatusCodes.FORBIDDEN));
    return;
  }

  const token = jwt.sign({ id: employee.id }, JWT_SECRET);
  const { password, ...employeeWithoutPassword } = employee;
  res
    .status(200)
    .cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .json({
      success: true,
      employee: employeeWithoutPassword,
    });
};
