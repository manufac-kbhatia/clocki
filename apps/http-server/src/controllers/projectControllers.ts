import { client } from "@repo/db";
import { ProjectSchema } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { CreateProjectResponse, ProjectPayload } from "@repo/schemas/rest";

export const createProject = async (
  req: Request<unknown, unknown, ProjectPayload>,
  res: Response<CreateProjectResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = ProjectSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }

  const { data } = parseResult;
  const { members, ...rest } = data;
  const project = await client.project.create({
    data: {
      ...rest,
      members: {
        connect: data.members?.map((id) => ({ id })),
      },
    },
    include: {
      members: true,
      Client: true,
    },
  });

  res.status(200).json({
    success: true,
    project,
  });
};
