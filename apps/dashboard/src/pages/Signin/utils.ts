import { LoginPayload } from "@repo/schemas";

export const SignInFormNames: Record<keyof LoginPayload, keyof LoginPayload> = {
  email: "email",
  password: "password",
};

export const SignInFormLabels: Record<keyof LoginPayload, string> = {
  email: "Email",
  password: "Password",
};

export const SignInFormPlaceholder: Record<keyof LoginPayload, string> = {
  email: "Enter your email",
  password: "Enter your password",
};
