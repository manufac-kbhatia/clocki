import { client } from "@repo/db";
import { ClientSchema, ProjectSchema, Role } from "@repo/schemas";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import {
  ClientPayload,
  CreateClientResponse,
  CreateProjectResponse,
  GetClientResponse,
  GetClientsResponse,
  ProjectPayload,
  UpdateClientPayload,
  UpdateClientResponse,
} from "@repo/schemas/rest";

export const createClient = async (
  req: Request<unknown, unknown, ClientPayload>,
  res: Response<CreateClientResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = ClientSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }

  const { data } = parseResult;
  const clientData = await client.client.create({
    data,
  });

  res.status(200).json({
    success: true,
    client: clientData,
  });
};

export const getClients = async (req: Request, res: Response<GetClientsResponse>, next: NextFunction) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;

  if (organisationId !== null) {
    const clientsData = await client.client.findMany({
      where: {
        organisationId: organisationId,
      },
    });

    res.status(200).json({
      success: true,
      clients: clientsData,
    });
  }
};

export const updateClient = async (
  req: Request<{ id: string }, unknown, UpdateClientPayload>,
  res: Response<UpdateClientResponse>,
  next: NextFunction,
) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  const payload = req.body;
  const clientId = req.params.id;

  const parseResult = ClientSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }
  if (organisationId !== null) {
    const { data } = parseResult;
    const clientData = await client.client.update({
      where: {
        id: clientId,
        organisationId: organisationId,
      },
      data,
    });

    res.status(200).json({
      success: true,
      client: clientData,
    });
  }
};

export const getClient = async (req: Request<{ id: string }>, res: Response<GetClientResponse>, next: NextFunction) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  const clientId = req.params.id;

  if (organisationId !== null) {
    const clientData = await client.client.findUnique({
      where: {
        id: clientId,
        organisationId: organisationId,
      },
    });

    if (clientData === null) {
      next(new ErrorHandler("Client not found", StatusCodes.NOT_FOUND));
      return;
    }

    res.status(200).json({
      success: true,
      client: clientData,
    });
  }
};
