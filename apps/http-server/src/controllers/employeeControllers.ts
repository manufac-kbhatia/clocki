import { client, Role } from "@repo/db";
import {
  ErrorResponse,
  RegisterEmployeePayload,
  RegisterEmployeeSchema,
  RegisterEmployeeResponse,
  EmployeePayload,
  EmployeeSchema,
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
