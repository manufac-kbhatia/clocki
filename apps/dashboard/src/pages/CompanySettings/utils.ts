import { UpdateOrganisationPayload } from "@repo/schemas/rest";

export const UpdateOrganisationFormNames: Record<keyof UpdateOrganisationPayload, keyof UpdateOrganisationPayload> = {
  address: "address",
  city: "city",
  vatNumber: "vatNumber",
  companyName: "companyName",
};

export const UpdateOrganisationFormLabels: Record<keyof UpdateOrganisationPayload, string> = {
  address: "Address",
  city: "City",
  vatNumber: "VAT Number",
  companyName: "Company Name",
};

export const UpdateOrganisationFormPlaceholder: Record<keyof UpdateOrganisationPayload, string> = {
  address: "-",
  city: "-",
  vatNumber: "-",
  companyName: "-",
};
