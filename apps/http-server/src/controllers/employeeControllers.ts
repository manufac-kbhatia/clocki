import { client, Role } from "@repo/db";
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
import { Request, Response } from "express";
import { JWT_SECRET } from "../utils";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request<unknown, unknown, RegisterEmployeePayload>,
  res: Response<RegisterEmployeeResponse | ErrorResponse>
) => {
  try {
    const payload = req.body;
    const parseResult = RegisterEmployeeSchema.safeParse(payload);
    if (parseResult.success === false) {
      res.status(400).json({ error: "Invalid input" });
      return;
    }
    const employee = await client.employee.create({
      data: {
        firstName: payload.firstName,
        lastname: payload.lastName,
        email: payload.email,
        password: payload.password,
        role: Role.Admin,
      },
      // Ref: https://www.prisma.io/docs/orm/prisma-client/queries/excluding-fields#excluding-a-field-locally-using-omit
      omit: {
        password: true,
      },
    });

    const token = jwt.sign({ id: employee.id }, JWT_SECRET);
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ message: "success", employee });
  } catch (error: unknown) {
    res.status(411).json({
      error: "User already exists with this email",
    });
  }
};

export const createEmployee = async (
  req: Request<unknown, unknown, EmployeePayload>,
  res: Response<RegisterEmployeeResponse | ErrorResponse>
) => {
  try {
    const payload = req.body;
    const parseResult = EmployeeSchema.safeParse(payload);
    if (parseResult.success === false) {
      res.status(400).json({ error: "Invalid input" });
      return;
    }
    const { data } = parseResult;
    const employee = await client.employee.create({
      data: {
        firstName: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password, // TODO: add random generated password and send the credentials to the employee via email telling that they can reset their password
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        role: data.role ?? Role.Other,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        teams: {
          connect: data.teamsId?.map((id) => ({ id })),
        },
        employeeInfo: {
          create: {
            hireDate: data.hireDate,
            positon: data.position,
            contractType: data.contractType,
          },
        },
      },
    });
    res.status(200).json({
      message: "success",
      employee,
    });
  } catch (error: unknown) {
    res.status(411).json({
      error: "Employee already exists with this email",
    });
  }
};

export const getEmployee = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
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
      message: "success",
      employee,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "fail",
      error: "Something went wrong",
    });
  }
};

export const updateEmployee = async (
  req: Request<{ id: string }, unknown, UpdateEmployeePayload>,
  res: Response
) => {
  try {
    const payload = req.body;
    const parseResult = UpdateEmployeeSchema.safeParse(payload);
    if (parseResult.success === false) {
      res.status(400).json({ error: "Invalid input" });
      return;
    }
    const employeeId = parseInt(req.params.id);
    const data = parseResult.data;
    const employee = client.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        firstName: data.firstName,
        lastname: data.lastName,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        role: data.role ?? undefined,
        gender: data.gender,
        employeeInfo: {
          update: {
            hireDate: data.hireDate,
            contractType: data.contractType,
            positon: data.position,
            vacationDays: data.vacationDays ?? undefined,
          },
        },
      },
      omit: {
        password: true,
      },
    });

    res.status(200).json({
      message: "success",
      employee,
    });
  } catch (error: unknown) {
    res.status(400).json({
      message: "fail",
      error: "Unable to update the employee, please try again",
    });
  }
};

export const deleteEmployee = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const employeeId = parseInt(req.params.id);
    const employeeExist = await client.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (employeeExist === null) {
      res.status(404).json({
        message: "fail",
        error: "The employee you are trying do delete doesn't exist",
      });
      return;
    }

    await client.employee.delete({
      where: {
        id: employeeId,
      },
    });
    res.status(200).json({
      message: "success",
      deletedEmployeeId: employeeId,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "fail",
      error:
        "Something went wrong while deleting the employee, please try again",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const me = await client.employee.findUnique({
      where: {
        id: req.employee?.id,
      },
      omit: {
        password: true,
      },
    });

    res.status(200).json({
      message: "success",
      me,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "fail",
      error: "Somethin wernt wrong",
    });
  }
};
