import { Employee } from "@repo/db";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      employee?: Omit<Employee, "password"> | null;
    }
  }
}
