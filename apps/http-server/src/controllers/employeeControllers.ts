import { client, PrismaUtils } from "@repo/db";
import {
  ErrorResponse,
  RegisterEmployeePayload,
  RegisterEmployeeSchema,
  RegisterEmployeeResponse,
  EmployeePayload,
  EmployeeSchema,
  UpdateEmployeePayload,
  UpdateEmployeeSchema,
} from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../utils";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";

export const register = async (
  req: Request<unknown, unknown, RegisterEmployeePayload>,
  res: Response<RegisterEmployeeResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = RegisterEmployeeSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }

  const { data } = parseResult;
  const employee = await client.employee.create({
    data: {
      ...data,
      role: PrismaUtils.Role.Admin,
    },
    // Ref: https://www.prisma.io/docs/orm/prisma-client/queries/excluding-fields#excluding-a-field-locally-using-omit
    omit: {
      password: true,
    },
  });

  const token = jwt.sign({ id: employee.id }, JWT_SECRET);
  res.status(200).cookie("token", token, { httpOnly: true }).json({ success: true, employee });
};

export const createEmployee = async (
  req: Request<unknown, unknown, EmployeePayload>,
  res: Response<RegisterEmployeeResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = EmployeeSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }
  const { hireDate, position, contractType, teamsId, role, ...rest } = parseResult.data;
  const employee = await client.employee.create({
    data: {
      ...rest,
      role: role ?? PrismaUtils.Role.Other,
      teams: {
        connect: teamsId?.map((id) => ({ id })),
      },
      employeeInfo: {
        create: {
          hireDate: hireDate,
          positon: position,
          contractType: contractType,
        },
      },
    },
  });
  res.status(200).json({
    success: true,
    employee,
  });
};

export const getEmployee = async (req: Request<{ id: string }>, res: Response) => {
  const employeeId = parseInt(req.params.id);
  const employee = await client.employee.findUnique({
    where: {
      id: employeeId,
    },
    omit: {
      password: true,
    },
  });
  res.status(200).json({
    success: true,
    employee,
  });
};

export const updateEmployee = async (
  req: Request<{ id: string }, unknown, UpdateEmployeePayload>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = UpdateEmployeeSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }
  const employeeId = parseInt(req.params.id);
  const { role, hireDate, contractType, vacationDays, position, teamsId, ...rest } = parseResult.data;
  const employee = client.employee.update({
    where: {
      id: employeeId,
    },
    data: {
      ...rest,
      role: role ?? undefined,
      employeeInfo: {
        update: {
          hireDate: hireDate,
          contractType: contractType,
          positon: position,
          vacationDays: vacationDays ?? undefined,
        },
      },
    },
    omit: {
      password: true,
    },
  });

  res.status(200).json({
    success: true,
    employee,
  });
};

export const deleteEmployee = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const employeeId = parseInt(req.params.id);
  const employeeExist = await client.employee.findUnique({
    where: {
      id: employeeId,
    },
  });

  if (employeeExist === null) {
    next(new ErrorHandler("The employee you are trying do delete doesn't exist", StatusCodes.NOT_FOUND));
    return;
  }

  await client.employee.delete({
    where: {
      id: employeeId,
    },
  });
  res.status(200).json({
    success: true,
    employee: employeeId,
  });
};

export const getMe = async (req: Request, res: Response) => {
  const me = await client.employee.findUnique({
    where: {
      id: req.employee?.id,
    },
    omit: {
      password: true,
    },
  });

  res.status(200).json({
    success: true,
    me,
  });
};
