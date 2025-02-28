import { client } from "@repo/db";
import { RegisterOrganisationSchema } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import {
  DeleteOrganisationResponse,
  GetOrganisationResponse,
  RegisterOrganisationPayload,
  SetupOrganisationResponse,
} from "@repo/schemas/rest";

export const setupOrganisation = async (
  req: Request<unknown, unknown, RegisterOrganisationPayload>,
  res: Response<SetupOrganisationResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = RegisterOrganisationSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
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
    success: true,
    organisation,
  });
};

export const deleteOrganisation = async (
  req: Request<{ id: string }>,
  res: Response<DeleteOrganisationResponse>,
  next: NextFunction,
) => {
  const organisationId = parseInt(req.params.id);
  const organisationExist = await client.organisation.findUnique({
    where: {
      id: organisationId,
    },
  });
  if (organisationExist === null) {
    next(new ErrorHandler("Organisation not found", StatusCodes.NOT_FOUND));
    return;
  }

  const organisation = await client.organisation.delete({
    where: {
      id: organisationExist.id,
    },
  });

  res.status(200).json({
    success: true,
    organisationId,
    message: "Organisation deleted successfully",
  });
};

export const getOrganisation = async (
  req: Request<{ id: string }>,
  res: Response<GetOrganisationResponse>,
  next: NextFunction,
) => {
  const id = parseInt(req.params.id);
  const organisation = await client.organisation.findUnique({
    where: {
      id,
    },
  });

  if (organisation === null) {
    next(new ErrorHandler("Organisation not found", StatusCodes.NOT_FOUND));
    return;
  }

  res.status(200).json({
    success: true,
    organisation,
  });
};
