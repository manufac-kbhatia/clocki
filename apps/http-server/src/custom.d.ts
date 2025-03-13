import type { Prisma } from "@repo/db";
import type { Role } from "@repo/schemas";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      employeeId?: string;
      role?: Role;
      employee?: Prisma.EmployeeGetPayload<{ include: { createdOrganisation: true }, omit: {password: true, refreshToken: true} }>;
    }
  }
}
