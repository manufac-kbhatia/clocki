import { client } from "@repo/db";
import { TeamPayload, TeamSchema } from "@repo/schemas";
import { Request, Response } from "express";

export const createTeam = async (
  req: Request<unknown, unknown, TeamPayload>,
  res: Response
) => {
  try {
    const payload = req.body;
    const parseResult = TeamSchema.safeParse(payload);
    if (parseResult.success === false) {
      res.status(400).json({ error: "Invalid input" });
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
      message: "success",
      team,
    });
  } catch (error: unknown) {
    res.status(411).json({
      error: "Team with same name already exist",
    });
  }
};
