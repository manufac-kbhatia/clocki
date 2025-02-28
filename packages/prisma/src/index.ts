import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient();
export type { Employee, Organisation, Project, Team } from "@prisma/client";
export * as PrismaUtils from "@prisma/client";
