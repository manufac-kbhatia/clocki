import { z } from "zod";
import { ContractType, Employee, Gender, Organisation, Role } from "@repo/db";

export const RegisterEmployeeSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
  firstName: z.string().min(1, "Please provide your first name"),
  lastName: z.string().nullable(),
});

export type RegisterEmployeePayload = z.infer<typeof RegisterEmployeeSchema>;

export const RegisterOrganisationSchema = z.object({
  companyName: z.string().min(1, "Organisation name is required"),
  address: z.string().min(1, "Address is required to register an Organisation"),
  city: z.string().min(1, "City is required to register an Organisation"),
  vatNumber: z
    .string()
    .min(1, "VAT number is required to register an Organisation"),
});

export type RegisterOrganisationPayload = z.infer<
  typeof RegisterOrganisationSchema
>;

export const EmployeeSchema = z.object({
  // Personal information
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
  firstName: z
    .string()
    .min(1, "First name is requred to create a new Employee"),
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
  teamsId: z.array(z.number()).optional(),
  vacationDays: z.number().nullable(),
  role: z.nativeEnum(Role).nullable(),
});

export type EmployeePayload = z.infer<typeof EmployeeSchema>;

export interface RegisterEmployeeResponse {
  message: string;
  employee: Employee;
}

export interface RegisterOrganisationResponse {
  message: string;
  organisation: Organisation;
}

export interface ErrorResponse {
  error: string;
}
