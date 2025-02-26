import { RegisterOrganisationPayload } from "@repo/schemas";

export const RegisterOrgnisationFormNames: Record<
  keyof RegisterOrganisationPayload,
  keyof RegisterOrganisationPayload
> = {
  companyName: "companyName",
  vatNumber: "vatNumber",
  city: "city",
  address: "address",
};

export const RegisterOrganisationFormLabels: Record<keyof RegisterOrganisationPayload, string> = {
  companyName: "Company Name",
  vatNumber: "VAT NUmber",
  city: "City",
  address: "Address",
};

export const RegisterOrganisationFormPlaceholder: Record<keyof RegisterOrganisationPayload, string> = {
  companyName: "Enter Company Name",
  vatNumber: "12345678901",
  city: "Enter city",
  address: "Enter address",
};
