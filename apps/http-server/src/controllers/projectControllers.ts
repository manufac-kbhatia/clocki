import { client } from "@repo/db";
import { ProjectPayload, ProjectSchema } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";

export const createProject = async (
  req: Request<unknown, unknown, ProjectPayload>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = ProjectSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }

  const { data } = parseResult;
  const project = await client.project.create({
    data: {
      name: data.name,
      Organisation: {
        connect: {
          id: data.organisationId,
        },
      },
      members: {
        connect: data.members?.map((id) => ({ id })),
      },
    },
    include: {
      members: true,
    },
  });

  res.status(200).json({
    success: true,
    project,
  });
};
