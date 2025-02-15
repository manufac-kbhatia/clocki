import { Employee } from "@repo/db";
import { Request, Response } from "express";

export const register = async (
  req: Request<unknown, unknown, Employee>,
  res: Response
) => {};
