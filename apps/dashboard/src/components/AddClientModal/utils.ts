import { ClientPayload } from "@repo/schemas/rest";

export const CreateClientFormNames: Record<keyof ClientPayload, keyof ClientPayload> = {
  name: "name",
  email: "email",
  address: "address",
  city: "city",
  organisationId: "organisationId",
  phoneNumber: "phoneNumber",
};

export const CreateClientFormLabels: Record<keyof ClientPayload, string> = {
  name: "Name",
  email: "Email",
  address: "Address",
  city: "City",
  organisationId: "-",
  phoneNumber: "Phone Number",
};

export const CreateClientFormPlaceholder: Record<keyof ClientPayload, string> = {
  name: "Enter name",
  email: "Enter email",
  address: "Enter address",
  city: "Enter city",
  organisationId: "-",
  phoneNumber: "Enter phone number",
};
