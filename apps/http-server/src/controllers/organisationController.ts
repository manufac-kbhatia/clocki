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
      res.status(400).json({ error: "Invalid input" });
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

export const deleteOrganisation = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const organisationId = parseInt(req.params.id);
    const organisationExist = await client.organisation.findUnique({
      where: {
        id: organisationId,
      },
    });
    if (organisationExist === null) {
      res.status(404).json({
        message: "false",
        error: "Organisation not found",
      });
      return;
    }

    await client.organisation.delete({
      where: {
        id: organisationExist.id,
      },
    });

    res.status(200).json({
      message: "success",
      error: "Organisation deleted successfully",
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "false",
      error: "Unable to delete the organisation, as something went wrong",
    });
  }
};

export const getOrganisation = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const organisation = await client.organisation.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "success",
      organisation,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "false",
      error: "Something went wrong",
    });
  }
};
