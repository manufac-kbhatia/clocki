import { UpdatePersonalInfoPayload } from "@repo/schemas/rest";

export const UpdatePersonalInfoFormNames: Record<keyof UpdatePersonalInfoPayload, keyof UpdatePersonalInfoPayload> = {
  firstName: "firstName",
  lastName: "lastName",
  address: "address",
  city: "city",
  postalCode: "postalCode",
  phoneNumber: "phoneNumber",
  gender: "gender",
  dateOfBirth: "dateOfBirth",
};

export const UpdatePersonalInfoFormLabels: Record<keyof UpdatePersonalInfoPayload, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  address: "Address",
  city: "City",
  postalCode: "Postal Code",
  phoneNumber: "Phone Number",
  gender: "Gender",
  dateOfBirth: "Date Of Birth",
};

export const UpdatePersonalInfoFormPlaceholder: Record<keyof UpdatePersonalInfoPayload, string> = {
  firstName: "-",
  lastName: "-",
  address: "-",
  city: "-",
  postalCode: "-",
  phoneNumber: "-",
  gender: "-",
  dateOfBirth: "-",
};
