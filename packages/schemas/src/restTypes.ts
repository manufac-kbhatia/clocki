import z from "zod";
import {
  ClientSchema,
  CreateEmployeeSchema,
  LoginSchema,
  ProjectSchema,
  RegisterEmployeeSchema,
  RegisterOrganisationSchema,
  TeamSchema,
  UpdateEmployeeSchema,
  UpdateOrganisationSchema,
  UpdatePersonalInfoSchema,
} from ".";
import { Prisma } from "@repo/db";

// Infered types from Zod Schemas
export type RegisterOrganisationPayload = z.infer<typeof RegisterOrganisationSchema>;
export type RegisterEmployeePayload = z.infer<typeof RegisterEmployeeSchema>;
export type CreateEmployeePayload = z.infer<typeof CreateEmployeeSchema>;
export type TeamPayload = z.infer<typeof TeamSchema>;
export type ProjectPayload = z.infer<typeof ProjectSchema>;
export type ClientPayload = z.infer<typeof ClientSchema>;
export type LoginPayload = z.infer<typeof LoginSchema>;
export type UpdateEmployeePayload = z.infer<typeof UpdateEmployeeSchema>;
export type UpdateOrganisationPayload = z.infer<typeof UpdateOrganisationSchema>;
export type UpdatePersonalInfoPayload = z.infer<typeof UpdatePersonalInfoSchema>;

// Rest Types

export interface Auth {
  accessToken: string;
}

export interface BaseResponseType {
  success: boolean;
}
export interface RegisterEmployeeResponse extends BaseResponseType {
  accessToken: string;
  employeeData: EmployeeWithOrganisation;
}

export interface CreateEmployeeResponse extends BaseResponseType {
  employee: Employee;
}

export interface LoginEmployeeResponse extends BaseResponseType {
  employeeData: EmployeeWithOrganisation;
  accessToken: string;
}

export interface RefreshTokenResponse extends BaseResponseType {
  accessToken: string;
  employeeData: EmployeeWithOrganisation;
}

export interface RegisterOrganisationResponse extends BaseResponseType {
  organisation: Organisation;
}

export interface DeleteEmployeeResponse extends BaseResponseType {
  employeeId: string;
}

export interface GetMeReponse extends BaseResponseType {
  employeeData: EmployeeWithOrganisation;
}

export interface GetEmployeeResponse extends BaseResponseType {
  employee: EmployeeWithEmployeeInfo;
}

export interface GetEmployeesResponse extends BaseResponseType {
  employees: EmployeeWithEmployeeInfo[];
}

// Check for this
export interface UpdateEmployeeResponse extends BaseResponseType {
  employee: EmployeeWithEmployeeInfo;
}

export interface SetupOrganisationResponse extends BaseResponseType {
  organisation: Organisation;
}

export interface GetOrganisationResponse extends BaseResponseType {
  organisation: Organisation;
}

export interface UpdateOrganisationResponse extends BaseResponseType {
  organisation: Organisation;
}

export interface DeleteOrganisationResponse extends BaseResponseType {
  organisationId: string;
}

// Check for this
export interface CreateProjectResponse extends BaseResponseType {
  project: ProjectWithInfo;
}

export interface CreateClientResponse extends BaseResponseType {
  client: Client;
}

export interface CreateTeamResponse extends BaseResponseType {
  team: Team;
}

export interface GetTeamsResponse extends BaseResponseType {
  teams: Team[];
}

export interface GetTeamResponse extends BaseResponseType {
  team: Team;
}

export interface GetClientsResponse extends BaseResponseType {
  clients: Client[];
}

export interface DeleteTeamResponse extends BaseResponseType {
  teamId: string;
}

export type EmployeeInfo = Prisma.EmployeeInfoGetPayload<{}>;
export type Employee = Prisma.EmployeeGetPayload<{ omit: { password: true; refreshToken: true } }>;
export type EmployeeWithEmployeeInfo = Prisma.EmployeeGetPayload<{
  omit: { password: true; refreshToken: true };
  include: { employeeInfo: true };
}>;
export type EmployeeWithOrganisation = Prisma.EmployeeGetPayload<{
  omit: { password: true; refreshToken: true };
  include: { createdOrganisation: true; organisation: true };
}>;

export type Team = Prisma.TeamGetPayload<{
  include: {
    members: { omit: { password: true; refreshToken: true } };
    teamLead: { omit: { password: true; refreshToken: true } };
  };
}>;
export type Project = Prisma.ProjectGetPayload<{}>;
export type ProjectWithInfo = Prisma.ProjectGetPayload<{
  include: {
    members: { omit: { password: true; refreshToken: true } };
    Client: true;
  };
}>;
export type Organisation = Prisma.OrganisationGetPayload<{
  include: { employees: { omit: { password: true; refreshToken: true } } };
}>;
export type Client = Prisma.ClientGetPayload<{}>;

export interface ErrorResponse {
  success: boolean;
  message: string;
}
