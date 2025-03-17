import { client } from "@repo/db";
import { ProjectSchema, Role, UpdateProjectSchema } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import {
  CreateProjectResponse,
  GetClientsResponse,
  GetProjectResponse,
  GetProjectsResponse,
  ProjectPayload,
  UpdateClientPayload,
  UpdateProjectPayload,
  UpdateProjectResponse,
} from "@repo/schemas/rest";

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

export const getProjects = async (req: Request, res: Response<GetProjectsResponse>, next: NextFunction) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;

  if (organisationId !== null) {
    const projects = await client.project.findMany({
      where: {
        organisationId: organisationId,
      },
      include: {
        members: true,
        Client: true,
      },
    });

    res.status(200).json({
      success: true,
      projects,
    });
  }
};

export const updateProject = async (
  req: Request<{ id: string }, unknown, UpdateProjectPayload>,
  res: Response<UpdateProjectResponse>,
  next: NextFunction,
) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  const payload = req.body;
  const projectId = req.params.id;

  const parseResult = UpdateProjectSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }
  if (organisationId !== null) {
    const { data } = parseResult;
    const { members, ...rest } = data;
    const project = await client.project.update({
      where: {
        id: projectId,
        organisationId: organisationId,
      },
      data: {
        ...rest,
        members: {
          set: members?.map((memberId) => ({ id: memberId })), // Updating members
        },
      },
      include: {
        members: true,
        Client: true,
      },
    });

    res.status(200).json({
      success: true,
      project: project,
    });
  }
};

export const getProject = async (
  req: Request<{ id: string }>,
  res: Response<GetProjectResponse>,
  next: NextFunction,
) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  const projectId = req.params.id;

  if (organisationId !== null) {
    const project = await client.project.findUnique({
      where: {
        id: projectId,
        organisationId: organisationId,
      },
      include: {
        Client: true,
        members: true,
      },
    });

    if (project === null) {
      next(new ErrorHandler("Project not found", StatusCodes.NOT_FOUND));
      return;
    }

    res.status(200).json({
      success: true,
      project,
    });
  }
};
