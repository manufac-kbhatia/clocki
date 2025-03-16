import { z } from "zod";

export const Gender = {
  Male: "Male",
  Female: "Female",
  NonBinary: "NonBinary",
  Other: "Other",
  PreferNotToSay: "PreferNotToSay",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const ContractType = {
  Permanent: "Permanent",
  Intern: "Intern",
  Contract: "Contract",
  Other: "Other",
} as const;

export type ContractType = (typeof ContractType)[keyof typeof ContractType];

export const Role = {
  Admin: "Admin",
  Hr: "Hr",
  Manager: "Manager",
  Other: "Other",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

// Zod Schemas
export const RegisterEmployeeSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
  firstName: z.string().min(1, "Please provide your first name"),
  lastName: z.string().optional(),
});

export const RegisterOrganisationSchema = z.object({
  companyName: z.string().min(1, "Organisation name is required"),
  address: z.string().min(1, "Address is required to register an Organisation"),
  city: z.string().min(1, "City is required to register an Organisation"),
  vatNumber: z.string().min(1, "VAT number is required to register an Organisation"),
});

export const CreateEmployeeSchema = z.object({
  // Personal information
  email: z.string().email("Please provide a valid email"),
  firstName: z.string().min(1, "First name is requred to create a new Employee"),
  lastName: z.string().optional(),
  address: z.string().min(1, "Address is required to create a new employee"),
  city: z.string().min(1, "City is required to create a new employee"),
  postalCode: z.string().optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number should include 10 digits")
    .max(10, "Phone number should include 10 digits")
    .optional(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.union([z.date(), z.string().transform((str) => new Date(str))]).optional(),

  // Emploment Info
  hireDate: z.union([z.date(), z.string().transform((str) => new Date(str))]).optional(),
  contractType: z.nativeEnum(ContractType).optional(),
  position: z.string().optional(),
  teamsId: z.array(z.string()).optional(),
  vacationDays: z.number().optional(),
  role: z.nativeEnum(Role).optional(),
});

export const TeamSchema = z.object({
  name: z.string().min(1, "Please provide a name to make team"),
  organisationId: z.string({
    required_error: "Organisation Id is required for team formation",
  }),
  teamLeadId: z.string({
    required_error: "Team Lead is required for team formation",
  }),
  members: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  name: z.string().min(1, "Please provide a name to create a project"),
  organisationId: z.string({
    required_error: "Organisation id is required to create a project",
  }),
  members: z.array(z.string()).optional(),
  clientId: z.string({
    required_error: "Client id is required to create a project",
  }),
});

export const ClientSchema = z.object({
  name: z.string().min(1, "Please provide a name to add a client"),
  email: z.string().email("Please provide a valid email"),
  address: z.string().min(1, "Please provide valid addredd").optional(),
  city: z.string().min(1, "Please provide valid city").optional(),
  phoneNumber: z.string().optional(),
  organisationId: z.string({
    required_error: "Organisation id is required to add a client",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Please provide password to login"),
});

export const UpdateEmployeeSchema = CreateEmployeeSchema.omit({
  email: true,
}).partial();

export const UpdateOrganisationSchema = RegisterOrganisationSchema.partial();

export const UpdatePersonalInfoSchema = z.object({
  // Personal information
  firstName: z.string().min(1, "Please provide first name").optional(),
  lastName: z.string().min(1, "Please provide last name").optional(),
  address: z.string().min(1, "Please provide address").optional(),
  city: z.string().min(1, "Please provide city").optional(),
  postalCode: z.string().optional(),
  phoneNumber: z.string().length(10, "Phone number should be of 10 digits").optional(),
  gender: z.nativeEnum(Gender).optional(),
  dateOfBirth: z.union([z.date(), z.string().transform((str) => new Date(str))]).optional(),
});
