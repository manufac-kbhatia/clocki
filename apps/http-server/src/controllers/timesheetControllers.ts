import { TimeEntrySchema } from "@repo/schemas";
import { CreateTimeEntryResponse, TimeEntryPayload } from "@repo/schemas/rest";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { client, PrismaUtils } from "@repo/db";

export const addTimeEntry = async (req: Request<TimeEntryPayload>, res: Response<CreateTimeEntryResponse>, next: NextFunction) => {
    const payload = req.body;
    const parseResult = TimeEntrySchema.safeParse(payload);
    if (parseResult.success === false) {
        next(new ErrorHandler("Invalid Input", StatusCodes.BAD_REQUEST))
        return;
    }

    const {data} = parseResult;
    const {status, ...rest} = data;
    const employeeId = req.employeeId;
    const timeEntry = await client.timesheet.create({
        data: {
            ...rest,
            employeeId: employeeId ?? "",
            status: status as PrismaUtils.Status
        },
    })

    res.status(StatusCodes.CREATED).json({success: true, timeEntry})
}

export const getTimeEntries = async (req: Request, res: Response) => {
    
}