import { RegisterEmployeePayload } from "@repo/schemas/rest";

export const RegisterFormNames: Record<keyof RegisterEmployeePayload, keyof RegisterEmployeePayload> = {
  email: "email",
  password: "password",
  firstName: "firstName",
  lastName: "lastName",
};

export const RegisterFormLabels: Record<keyof RegisterEmployeePayload, string> = {
  email: "Email",
  firstName: "First Name",
  password: "Create Password",
  lastName: "Last Name",
};

export const RegisterFormPlaceholder: Record<keyof RegisterEmployeePayload, string> = {
  email: "Enter your email",
  firstName: "Enter your first name",
  password: "Enter your password",
  lastName: "Enter your lastname",
};
