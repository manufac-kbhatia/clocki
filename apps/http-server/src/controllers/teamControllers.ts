import { client } from "@repo/db";
import { TeamSchema } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { CreateTeamResponse, TeamPayload } from "@repo/schemas/rest";

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
