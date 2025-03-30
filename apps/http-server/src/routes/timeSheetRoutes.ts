import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import catchAsync from "../middlewares/catchAsync";
import { Role, TimeSheetSchema } from "@repo/schemas";
import {
  CreateTimeEntryResponse,
  GetMyTimeEntryResponse,
  GetTimeEntryResponse,
  TimeEntryWithInfo,
  TimeSheetPayload,
} from "@repo/schemas/rest";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { client, PrismaUtils } from "@repo/db";


const router: Router = express.Router();

export const addTimeEntry = async (
  req: Request<TimeSheetPayload>,
  res: Response<CreateTimeEntryResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = TimeSheetSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler(parseResult.error.errors[0]?.message ?? "", StatusCodes.BAD_REQUEST));
    return;
  }

  const { data } = parseResult;
  const { status, ...rest } = data;
  const employeeId = req.employeeId;
  const timeEntry = await client.timesheet.create({
    data: {
      ...rest,
      employeeId: employeeId ?? "",
      status: status as PrismaUtils.Status,
    },
  });

  res.status(StatusCodes.CREATED).json({ success: true, timeEntry });
};

export const getMyTimeEntries = async (
  req: Request<unknown, unknown, unknown, { startDate?: string; endDate?: string }>,
  res: Response<GetMyTimeEntryResponse>,
  next: NextFunction,
) => {
  const employeeId = req.employeeId;
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    next(new ErrorHandler("Start and End date are required", StatusCodes.BAD_REQUEST));
  }

  const timesheetEntries = await client.timesheet.findMany({
    where: {
      employeeId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      project: true,
      employee: true,
    },
  });

  const groupedEntries = timesheetEntries.reduce(
    (acc, entry) => {
      const dateKey = entry.createdAt;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(entry);
      return acc;
    },
    {} as Record<string, TimeEntryWithInfo[]>,
  );

  res.status(StatusCodes.OK).json({
    success: true,
    timeEntry: groupedEntries,
  });
};

export const getTimeEntries = async (req: Request, res: Response<GetTimeEntryResponse>) => {
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;
  const teamId = req.params.id;
  if (organisationId) {
    const timeEntry = await client.timesheet.findMany({
      where: {
        project: {
          organisationId,
        },
      },
      include: {
        project: true,
        employee: true,
      },
    });
    res.status(StatusCodes.OK).json({ success: true, timeEntry });
  }
};


router
  .route("/log-time")
  .get(isAuthenticated, catchAsync(getMyTimeEntries))
  .post(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(addTimeEntry));

router
  .route("/time-logs")
  .get(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(getTimeEntries));

export default router;
