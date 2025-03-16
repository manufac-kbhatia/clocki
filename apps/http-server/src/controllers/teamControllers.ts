import { client } from "@repo/db";
import { Role, TeamSchema } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import {
  CreateTeamResponse,
  DeleteTeamResponse,
  GetTeamResponse,
  GetTeamsResponse,
  TeamPayload,
} from "@repo/schemas/rest";

export const createTeam = async (
  req: Request<unknown, unknown, TeamPayload>,
  res: Response<CreateTeamResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = TeamSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }

  const { data } = parseResult;
  const team = await client.team.create({
    data: {
      name: data.name,
      Organisation: {
        connect: {
          id: data.organisationId,
        },
      },
      teamLead: {
        connect: {
          id: data.teamLeadId,
        },
      },
      members: {
        connect: data.members?.map((id) => ({ id })),
      },
    },
    include: {
      teamLead: true,
      members: true,
    },
  });

  res.status(200).json({
    success: true,
    team,
  });
};

export const getTeams = async (req: Request, res: Response<GetTeamsResponse>) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  if (organisationId) {
    const teams = await client.team.findMany({
      where: { organisationId: organisationId },
      include: { members: true, teamLead: true },
    });
    res.status(StatusCodes.OK).json({ success: true, teams });
  }
};

export const getTeam = async (req: Request<{ id: string }>, res: Response<GetTeamResponse>, next: NextFunction) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  const teamId = req.params.id;
  if (organisationId) {
    const team = await client.team.findUnique({
      where: { id: teamId, organisationId: organisationId },
      include: { members: true, teamLead: true },
    });

    if (team === null) {
      next(new ErrorHandler("Team with given id not found", StatusCodes.NOT_FOUND));
      return;
    }
    res.status(StatusCodes.OK).json({ success: true, team });
  }
};

export const deleteTeam = async (req: Request<{ id: string }>, res: Response<DeleteTeamResponse>) => {
  const id = req.params.id;
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  if (organisationId) {
    const deletedTeam = await client.team.delete({ where: { id, organisationId } });
    res.status(StatusCodes.OK).json({ success: true, teamId: deletedTeam.id });
  }
};
