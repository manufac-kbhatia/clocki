import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient();
// export type { Employee, Organisation, Project, Team, Prisma } from "@prisma/client";
export type { Prisma } from "@prisma/client";
export * as PrismaUtils from "@prisma/client";
