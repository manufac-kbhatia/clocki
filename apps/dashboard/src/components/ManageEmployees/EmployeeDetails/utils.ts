import { UpdateEmployeePayload } from "@repo/schemas/rest";

export const UpdateEmployeeFormNames: Record<keyof UpdateEmployeePayload, keyof UpdateEmployeePayload> = {
  firstName: "firstName",
  lastName: "lastName",
  address: "address",
  city: "city",
  contractType: "contractType",
  dateOfBirth: "dateOfBirth",
  gender: "gender",
  hireDate: "hireDate",
  phoneNumber: "phoneNumber",
  position: "position",
  postalCode: "postalCode",
  role: "role",
  vacationDays: "vacationDays",
  teamsId: "teamsId",
};

export const UpdateEmployeeFormLabels: Record<keyof UpdateEmployeePayload, string> = {
  firstName: "First name",
  lastName: "Last Name",
  address: "Address",
  city: "City",
  contractType: "Contract Type",
  dateOfBirth: "Date of Birth",
  gender: "Gender",
  hireDate: "Hire Date",
  phoneNumber: "Phone Number",
  position: "Position",
  postalCode: "Postal Code",
  role: "Role",
  vacationDays: "Vacation Days",
  teamsId: "Teams",
};

export const UpdateEmployeeFormPlaceholder: Record<keyof UpdateEmployeePayload, string> = {
  firstName: "-",
  lastName: "-",
  address: "-",
  city: "-",
  contractType: "-",
  dateOfBirth: "-",
  gender: "-",
  hireDate: "-",
  phoneNumber: "-",
  position: "-",
  postalCode: "-",
  role: "-",
  vacationDays: "-",
  teamsId: "-",
};
