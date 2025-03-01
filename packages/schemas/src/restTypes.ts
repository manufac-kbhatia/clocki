import z from "zod";
import {
  EmployeeSchema,
  LoginSchema,
  ProjectSchema,
  RegisterEmployeeSchema,
  RegisterOrganisationSchema,
  TeamSchema,
  UpdateEmployeeSchema,
} from ".";
import { Prisma } from "@repo/db";

// Infered types from Zod Schemas
export type RegisterOrganisationPayload = z.infer<typeof RegisterOrganisationSchema>;
export type RegisterEmployeePayload = z.infer<typeof RegisterEmployeeSchema>;
export type EmployeePayload = z.infer<typeof EmployeeSchema>;
export type TeamPayload = z.infer<typeof TeamSchema>;
export type ProjectPayload = z.infer<typeof ProjectSchema>;
export type LoginPayload = z.infer<typeof LoginSchema>;
export type UpdateEmployeePayload = z.infer<typeof UpdateEmployeeSchema>;

// Rest Types

export interface BaseResponseType {
  success: boolean;
}
export interface RegisterEmployeeResponse extends BaseResponseType {
  employee: Prisma.EmployeeGetPayload<{ omit: { password: true } }>;
}

export interface LoginEmployeeResponse extends BaseResponseType {
  employee: Prisma.EmployeeGetPayload<{ omit: { password: true } }>;
}

export interface RegisterOrganisationResponse extends BaseResponseType {
  organisation: Prisma.OrganisationGetPayload<{}>;
}

export interface DeleteEmployeeResponse extends BaseResponseType {
  message: string;
  employeeId: number;
}

export interface GetMeReponse extends BaseResponseType {
  me: Prisma.EmployeeGetPayload<{ omit: { password: true }; include: { createdOrganisation: true } }>;
}

export interface GetEmployeeResponse extends BaseResponseType {
  employee: Prisma.EmployeeGetPayload<{ omit: { password: true } }>;
}

// Check for this
export interface UpdateEmployeeResponse extends BaseResponseType {
  employee: Prisma.EmployeeGetPayload<{ omit: { password: true } }>;
}

export interface SetupOrganisationResponse extends BaseResponseType {
  organisation: Prisma.OrganisationGetPayload<{}>;
}

export interface GetOrganisationResponse extends BaseResponseType {
  organisation: Prisma.OrganisationGetPayload<{}>;
}

export interface DeleteOrganisationResponse extends BaseResponseType {
  message: string;
  organisationId: number;
}

// Check for this
export interface CreateProjectResponse extends BaseResponseType {
  success: boolean;
  project: Prisma.ProjectGetPayload<{}>;
}

export interface CreateTeamResponse extends BaseResponseType {
  success: boolean;
  team: Prisma.TeamGetPayload<{}>;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
