import { client } from "@repo/db";
import { RegisterEmployeeSchema, CreateEmployeeSchema, UpdateEmployeeSchema, Role } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { PrismaUtils } from "@repo/db";
import {
  CreateEmployeeResponse,
  DeleteEmployeeResponse,
  CreateEmployeePayload,
  GetEmployeeResponse,
  GetMeReponse,
  RegisterEmployeePayload,
  RegisterEmployeeResponse,
  UpdateEmployeePayload,
  UpdateEmployeeResponse,
  GetEmployeesResponse,
} from "@repo/schemas/rest";
import { getJWTTokens } from "../utils/jwt";

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
    include: { createdOrganisation: true, organisation: true },
  });

  const { accessToken, refreshToken } = getJWTTokens({ id: employee.id, role: employee.role });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ success: true, accessToken, employeeData: employee });
};

export const createEmployee = async (
  req: Request<unknown, unknown, CreateEmployeePayload>,
  res: Response<CreateEmployeeResponse>,
  next: NextFunction,
) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  const payload = req.body;
  const parseResult = CreateEmployeeSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(
      new ErrorHandler(
        `${parseResult.error.errors[0]?.message} field: ${parseResult.error.errors[0]?.path}`,
        StatusCodes.BAD_REQUEST,
      ),
    );
    return;
  }
  const { hireDate, position, vacationDays, contractType, teamsId, role, ...rest } = parseResult.data;
  const password = "123456789"; // TODO: generate random password
  const employee = await client.employee.create({
    data: {
      ...rest,
      password,
      role: (role as PrismaUtils.Role) ?? PrismaUtils.Role.Other,
      teams: {
        connect: teamsId?.map((id) => ({ id })),
      },
      employeeInfo: {
        create: {
          hireDate,
          position,
          contractType,
          vacationDays,
        },
      },
      organisationId,
    }
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
    include: {
      employeeInfo: true,
    }
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

export const getEmployees = async (req: Request, res: Response<GetEmployeesResponse>, next: NextFunction) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  const employees = await client.employee.findMany({
    where: {
      organisationId,
    },
    include: {
      employeeInfo: true,
    }
  });

  res.status(200).json({
    success: true,
    employees,
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
          hireDate,
          contractType,
          position,
          vacationDays,
        },
      },
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
    include: { createdOrganisation: true, organisation: true },
  });

  if (me === null) {
    next(new ErrorHandler("Your accound doesn't exist", StatusCodes.NOT_FOUND));
    return;
  }

  res.status(200).json({
    success: true,
    employeeData: me,
  });
};
