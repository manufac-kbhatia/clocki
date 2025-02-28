import { z } from "zod";
import { ContractType, Gender, Role } from "./utils";

// Zod Schemas
export const RegisterEmployeeSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
  firstName: z.string().min(1, "Please provide your first name"),
  lastName: z.string().nullable(),
});

export const RegisterOrganisationSchema = z.object({
  companyName: z.string().min(1, "Organisation name is required"),
  address: z.string().min(1, "Address is required to register an Organisation"),
  city: z.string().min(1, "City is required to register an Organisation"),
  vatNumber: z.string().min(1, "VAT number is required to register an Organisation"),
});

export const EmployeeSchema = z.object({
  // Personal information
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(8, "Password must be atleast 8 characters long"), // TODO: Remove password from schema as it will be generated randomly on server side
  firstName: z.string().min(1, "First name is requred to create a new Employee"),
  lastName: z.string().nullable(),
  address: z.string().min(1, "Address is required to create a new employee"),
  city: z.string().min(1, "City is required to create a new employee"),
  postalCode: z.string().nullable(),
  phoneNumber: z
    .string()
    .min(10, "Phone number should include 10 digits")
    .max(10, "Phone number should include 10 digits")
    .nullable(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.date(),

  // Emploment Info
  hireDate: z.date(),
  contractType: z.nativeEnum(ContractType),
  position: z.string(),
  teamsId: z.array(z.number()).nullable(),
  vacationDays: z.number().nullable(),
  role: z.nativeEnum(Role).nullable(),
});

export const TeamSchema = z.object({
  name: z.string().min(1, "Please provide a name to make team"),
  organisationId: z.number({
    required_error: "Organisation Id is required for team formation",
  }),
  teamLeadId: z.number({
    required_error: "Team Lead is required for team formation",
  }),
  members: z.array(z.number()).nullable(),
});

export const ProjectSchema = z.object({
  name: z.string().min(1, "Please provide a name to create a project"),
  organisationId: z.number({
    required_error: "Organisation Id is required to create a project",
  }),
  members: z.array(z.number()).nullable(),
});

export const LoginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Please provide password to login"),
});

export const UpdateEmployeeSchema = EmployeeSchema.omit({
  email: true,
  password: true,
});
