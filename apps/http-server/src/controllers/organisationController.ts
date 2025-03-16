import { client } from "@repo/db";
import { RegisterOrganisationSchema, Role, UpdateOrganisationSchema } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import {
  DeleteOrganisationResponse,
  GetOrganisationResponse,
  RegisterOrganisationPayload,
  SetupOrganisationResponse,
  UpdateOrganisationPayload,
  UpdateOrganisationResponse,
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
          id: req.employeeId,
        },
      },
    },
    include: {
      employees: {
        where: {
          role: "Admin",
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
  const organisationId = req.params.id;
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
  });
};

export const getOrganisation = async (req: Request, res: Response<GetOrganisationResponse>, next: NextFunction) => {
  const id = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  if (id !== null) {
    const organisation = await client.organisation.findUnique({
      where: {
        id,
      },
      include: {
        employees: {
          where: {
            role: "Admin",
          },
        },
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
  }
};

export const updateOrganisation = async (
  req: Request<UpdateOrganisationPayload>,
  res: Response<UpdateOrganisationResponse>,
  next: NextFunction,
) => {
  const id = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  if (id !== null) {
    const payload = req.body;
    const parseResult = UpdateOrganisationSchema.safeParse(payload);
    if (parseResult.success === false) {
      next(new ErrorHandler("Invalid Input", StatusCodes.BAD_REQUEST));
      return;
    }

    const { data } = payload;
    const organisation = await client.organisation.update({
      where: {
        id,
      },
      data,
      include: {
        employees: { where: { role: "Admin" } },
      },
    });

    res.status(StatusCodes.OK).json({
      success: true,
      organisation,
    });
  }
};
