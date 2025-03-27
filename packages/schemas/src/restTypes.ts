import z from "zod";
import {
  ClientSchema,
  CreateEmployeeSchema,
  LoginSchema,
  ProjectSchema,
  RegisterEmployeeSchema,
  RegisterOrganisationSchema,
  TeamSchema,
  TimeSheetSchema,
  UpdateClientSchema,
  UpdateEmployeeSchema,
  UpdateOrganisationSchema,
  UpdatePersonalInfoSchema,
  UpdateProjectSchema,
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
export type UpdateClientPayload = z.infer<typeof UpdateClientSchema>;
export type UpdateProjectPayload = z.infer<typeof UpdateProjectSchema>;
export type TimeSheetPayload = z.infer<typeof TimeSheetSchema>;

// Rest Types

export interface Auth {
  accessToken: string;
}

export interface BaseResponseType {
  success: boolean;
}
export interface RegisterEmployeeResponse extends BaseResponseType {
  accessToken: string;
  employeeData: UserWithInfo;
}

export interface CreateEmployeeResponse extends BaseResponseType {
  employee: Employee;
}

export interface LoginEmployeeResponse extends BaseResponseType {
  employeeData: UserWithInfo;
  accessToken: string;
}

export interface RefreshTokenResponse extends BaseResponseType {
  accessToken: string;
  employeeData: UserWithInfo;
}

export interface RegisterOrganisationResponse extends BaseResponseType {
  organisation: Organisation;
}

export interface DeleteEmployeeResponse extends BaseResponseType {
  employeeId: string;
}

export interface GetMeReponse extends BaseResponseType {
  employeeData: UserWithInfo;
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

export interface GetProjectsResponse extends BaseResponseType {
  projects: ProjectWithInfo[];
}

export interface GetProjectResponse extends BaseResponseType {
  project: ProjectWithInfo;
}

export interface UpdateProjectResponse extends BaseResponseType {
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

export interface GetClientResponse extends BaseResponseType {
  client: Client;
}

export interface UpdateClientResponse extends BaseResponseType {
  client: Client;
}

export interface DeleteTeamResponse extends BaseResponseType {
  teamId: string;
}

export interface CreateTimeEntryResponse extends BaseResponseType {
  timeEntry: TimeEntry;
}

export interface GetMyTimeEntryResponse extends BaseResponseType {
  timeEntry: Record<string, TimeEntryWithInfo[]>;
}

export interface GetTimeEntryResponse extends BaseResponseType {
  timeEntry: TimeEntryWithInfo[];
}

export interface AgentResponse extends BaseResponseType {
  response: string;
}

export type EmployeeInfo = Prisma.EmployeeInfoGetPayload<{}>;
export type Employee = Prisma.EmployeeGetPayload<{ omit: { password: true; refreshToken: true } }>;
export type EmployeeWithEmployeeInfo = Prisma.EmployeeGetPayload<{
  omit: { password: true; refreshToken: true };
  include: { employeeInfo: true };
}>;
export type UserWithInfo = Prisma.EmployeeGetPayload<{
  omit: { password: true; refreshToken: true };
  include: {
    createdOrganisation: true;
    organisation: true;
    projects: { select: { name: true; members: { select: { firstName: true; lastName: true } } } };
    teams: {
      select: {
        name: true;
        members: { select: { firstName: true; lastName: true } };
        teamLead: { select: { firstName: true; lastName: true } };
      };
    };
    employeeInfo: true;
  };
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
export type TimeEntry = Prisma.TimesheetGetPayload<{}>;
export type TimeEntryWithInfo = Prisma.TimesheetGetPayload<{
  include: { project: true; employee: { omit: { password: true; refreshToken: true } } };
}>;

export interface ErrorResponse {
  success: boolean;
  message: string;
}
