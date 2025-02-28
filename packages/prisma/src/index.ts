import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient();
export { ContractType, Gender, Role } from "@prisma/client";
export type {Employee, Organisation, Project, Team} from "@prisma/client";
// export * as PrismaUtils from "@prisma/client";
