import { client } from "@repo/db";
import { ClientSchema, ProjectSchema } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { ClientPayload, CreateClientResponse, CreateProjectResponse, ProjectPayload } from "@repo/schemas/rest";

export const createClient = async (
  req: Request<unknown, unknown, ClientPayload>,
  res: Response<CreateClientResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = ClientSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }

  const { data } = parseResult;
  const clientData = await client.client.create({
    data,
  });

  res.status(200).json({
    success: true,
    client: clientData,
  });
};
