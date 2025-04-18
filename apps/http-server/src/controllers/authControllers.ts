import { client } from "@repo/db";
import { LoginSchema } from "@repo/schemas";
import { LoginEmployeeResponse, LoginPayload, RefreshTokenResponse } from "@repo/schemas/rest";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { getAccessToken, getJWTTokens } from "../utils/jwt";
import { REFRESH_JWT_SECRET } from "../utils";

export const login = async (
  req: Request<unknown, unknown, LoginPayload>,
  res: Response<LoginEmployeeResponse>,
  next: NextFunction,
) => {
  const payload = req.body;
  const parseResult = LoginSchema.safeParse(payload);
  if (parseResult.success === false) {
    next(new ErrorHandler("Invalid input", StatusCodes.BAD_REQUEST));
    return;
  }

  const data = parseResult.data;
  const employee = await client.employee.findUnique({
    where: {
      email: data.email,
    },
    omit: {
      password: false, // The password field is now selected.
    },
    include: { createdOrganisation: true, organisation: true },
  });

  if (employee === null) {
    next(new ErrorHandler("Employee with this email not found", StatusCodes.NOT_FOUND));
    return;
  }
  if (employee.password !== data.password) {
    next(new ErrorHandler("Invalid credentials", StatusCodes.FORBIDDEN));
    return;
  }

  const { accessToken, refreshToken } = getJWTTokens({ id: employee.id, role: employee.role });

  const updatedEmployee = await client.employee.update({
    where: { email: data.email },
    data: { refreshToken },
    include: {
      createdOrganisation: true,
      organisation: true,
      projects: { select: { name: true, members: { select: { firstName: true, lastName: true } } } },
      teams: {
        select: {
          name: true,
          teamLead: { select: { firstName: true, lastName: true } },
          members: { select: { firstName: true, lastName: true } },
        },
      },
      responsibleTeams: {
        select: {
          name: true,
          teamLead: { select: { firstName: true, lastName: true } },
          members: { select: { firstName: true, lastName: true } },
        },
      },
      employeeInfo: true,
    },
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ success: true, accessToken, employeeData: updatedEmployee });
};

export const refreshToken = async (req: Request, res: Response<RefreshTokenResponse>, next: NextFunction) => {
  const { refreshToken } = req.cookies;

  if (refreshToken === undefined) {
    next(new ErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED));
    return;
  }

  if (typeof refreshToken === "string") {
    const employee = await client.employee.findFirst({
      where: { refreshToken },
      omit: { password: true },
      include: {
        createdOrganisation: true,
        organisation: true,
        projects: { select: { name: true, members: { select: { firstName: true, lastName: true } } } },
        teams: {
          select: {
            name: true,
            teamLead: { select: { firstName: true, lastName: true } },
            members: { select: { firstName: true, lastName: true } },
          },
        },
        responsibleTeams: {
          select: {
            name: true,
            teamLead: { select: { firstName: true, lastName: true } },
            members: { select: { firstName: true, lastName: true } },
          },
        },
        employeeInfo: true,
      },
    });
    if (employee === null) {
      next(new ErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED));
      return;
    }

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET) as Record<string, string>;
      const payload = { id: decoded.id, role: decoded.role };
      const accessToken = getAccessToken(payload);
      res.status(StatusCodes.OK).json({ success: true, accessToken, employeeData: employee });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(new ErrorHandler(error.message, StatusCodes.FORBIDDEN));
        return;
      }
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (refreshToken === undefined) {
    res.sendStatus(StatusCodes.NO_CONTENT);
    return;
  }

  if (typeof refreshToken === "string") {
    const employee = await client.employee.findFirst({ where: { refreshToken } });
    if (employee === null) {
      res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }

    await client.employee.update({ where: { id: employee.id }, data: { refreshToken: null } });
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(StatusCodes.NO_CONTENT);
  }
};
