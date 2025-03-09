import { client } from "@repo/db";
import { RegisterEmployeeSchema, EmployeeSchema, UpdateEmployeeSchema } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { PrismaUtils } from "@repo/db";
import {
  DeleteEmployeeResponse,
  EmployeePayload,
  GetEmployeeResponse,
  GetMeReponse,
  RegisterEmployeePayload,
  RegisterEmployeeResponse,
  UpdateEmployeePayload,
  UpdateEmployeeResponse,
} from "@repo/schemas/rest";
import { getJWTTokens } from "../utils/jwt";

export const register = async (
  req: Request<unknown, unknown, RegisterEmployeePayload>,
  res: Response,
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

  const { accessToken, refreshToken } = getJWTTokens({ id: employee.id });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ accessToken });
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
      role: (role as PrismaUtils.Role) ?? PrismaUtils.Role,
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

export const getEmployee = async (
  req: Request<{ id: string }>,
  res: Response<GetEmployeeResponse>,
  next: NextFunction,
) => {
  const employeeId = req.params.id;
  const employee = await client.employee.findUnique({
    where: {
      id: employeeId,
    },
    omit: {
      password: true,
    },
  });

  if (employee === null) {
    next(new ErrorHandler("Employee with not found", StatusCodes.NOT_FOUND));
    return;
  }
  res.status(200).json({
    success: true,
    employee,
  });
};

export const updateEmployee = async (
  req: Request<{ id: string }, unknown, UpdateEmployeePayload>,
  res: Response<UpdateEmployeeResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = UpdateEmployeeSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }
  const employeeId = req.params.id;
  const { role, hireDate, contractType, vacationDays, position, teamsId, ...rest } = parseResult.data;
  const employee = await client.employee.update({
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
    include: {
      employeeInfo: true,
    },
  });

  res.status(200).json({
    success: true,
    employee,
  });
};

export const deleteEmployee = async (
  req: Request<{ id: string }>,
  res: Response<DeleteEmployeeResponse>,
  next: NextFunction,
) => {
  const employeeId = req.params.id;
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
    message: "Employee deleted successfully",
    employeeId: employeeId,
  });
};

export const getMe = async (req: Request, res: Response<GetMeReponse>, next: NextFunction) => {
  const me = await client.employee.findUnique({
    where: {
      id: req.employeeId,
    },
    omit: {
      password: true,
    },
    include: { createdOrganisation: true },
  });

  if (me === null) {
    next(new ErrorHandler("Your accound doesn't exist", StatusCodes.NOT_FOUND));
    return;
  }

  res.status(200).json({
    success: true,
    me,
  });
};
