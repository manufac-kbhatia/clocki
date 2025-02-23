import { PrismaUtils } from "@repo/db";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      employee?: PrismaUtils.Employee | null;
    }
  }
}
