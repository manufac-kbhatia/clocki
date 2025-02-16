import { client, Role } from "@repo/db";
import {
  ErrorResponse,
  RegisterEmployeePayload,
  RegisterEmployeeSchema,
  RegisterEmployeeResponse,
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
      res.status(400).send({ error: "Invalid input" });
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

    res.status(200).json({
      message: "success",
      employee,
    });
  } catch (error: unknown) {
    res.status(411).json({
      error: "User already exists with this email",
    });
  }
};
