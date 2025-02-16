import { z } from "zod";
import { Employee, Organisation } from "@repo/db";

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
