import { PrismaClient } from "@prisma/client";

// TODO: Omit password globally and select password where required manually
export const client = new PrismaClient();
export type { Prisma } from "@prisma/client";
export * as PrismaUtils from "@prisma/client";
