import { client } from "@repo/db";
import { ProjectPayload, ProjectSchema } from "@repo/schemas";
import { Request, Response } from "express";

export const createProject = async (
  req: Request<unknown, unknown, ProjectPayload>,
  res: Response
) => {
  try {
    const payload = req.body;
    const parseResult = ProjectSchema.safeParse(payload);
    if (parseResult.success === false) {
      res.status(400).json({ error: "Invalid input" });
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
      message: "success",
      project,
    });
  } catch (error: unknown) {
    res.status(411).json({
      error: "Something went wrong, please try again",
    });
  }
};
