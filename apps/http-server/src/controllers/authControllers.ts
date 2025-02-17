import { client } from "@repo/db";
import { LoginPayload, LoginSchema } from "@repo/schemas";
import { json, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils";

export const login = async (
  req: Request<unknown, unknown, LoginPayload>,
  res: Response
) => {
  try {
    const payload = req.body;
    const parseResult = LoginSchema.safeParse(payload);
    if (parseResult.success === false) {
      res.status(400).json({ error: "Invalid input" });
      return;
    }

    const data = parseResult.data;
    const employee = await client.employee.findUnique({
      where: {
        email: data.email,
      },
    });
    if (employee === null) {
      res.status(404).json({
        message: "false",
        error: "Employee with this email not found",
      });
      return;
    }
    if (employee.password !== data.password) {
      res.status(401).json({
        message: "false",
        error: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign({ id: employee.id }, JWT_SECRET);
    const { password, ...employeeWithoutPassword } = employee;
    res.status(200).cookie("token", token, { httpOnly: true }).json({
      message: "success",
      employee: employeeWithoutPassword,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "false",
      error: "Internal server error, please try again",
    });
  }
};
