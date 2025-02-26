import { client } from "@repo/db";
import {
  ErrorResponse,
  RegisterOrganisationPayload,
  RegisterOrganisationResponse,
  RegisterOrganisationSchema,
} from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";

export const setupOrganisation = async (
  req: Request<unknown, unknown, RegisterOrganisationPayload>,
  res: Response,
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
    message: "success",
    organisation,
  });
};

export const deleteOrganisation = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
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

  await client.organisation.delete({
    where: {
      id: organisationExist.id,
    },
  });

  res.status(200).json({
    message: "success",
    error: "Organisation deleted successfully",
  });
};

export const getOrganisation = async (req: Request<{ id: string }>, res: Response) => {
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
};
