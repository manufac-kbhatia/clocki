import { Employee } from "@repo/db";
import { Request, Response } from "express";
import { registerSchema } from "@repo/schemas";

export const register = async (
  req: Request<unknown, unknown, Employee>,
  res: Response
) => {
  const payload = req.body;
  const parsedResults = registerSchema.safeParse(payload);
  if (parsedResults.success) {
    res.send(parsedResults.data);
  }
};
