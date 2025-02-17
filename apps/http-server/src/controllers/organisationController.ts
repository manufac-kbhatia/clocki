import { client, Role } from "@repo/db";
import {
  ErrorResponse,
  RegisterOrganisationPayload,
  RegisterOrganisationResponse,
  RegisterOrganisationSchema,
} from "@repo/schemas";
import { Request, Response } from "express";

export const setupOrganisation = async (
  req: Request<unknown, unknown, RegisterOrganisationPayload>,
  res: Response<RegisterOrganisationResponse | ErrorResponse>
) => {
  try {
    const payload = req.body;
    const parseResult = RegisterOrganisationSchema.safeParse(payload);
    if (parseResult.success === false) {
      res.status(400).send({ error: "Invalid input" });
      return;
    }
    const organisation = await client.organisation.create({
      data: {
        name: payload.companyName,
        address: payload.address,
        city: payload.city,
        vatNumber: payload.vatNumber,
        createdBy: {
          connect: {
            id: req.employee?.id,
          },
        },
      },
    });

    res.status(200).json({
      message: "success",
      organisation,
    });
  } catch (error: unknown) {
    res.status(411).json({
      error: "User already exists with this email",
    });
  }
};
