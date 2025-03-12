import { CreateEmployeePayload } from "@repo/schemas/rest";

export const CreateEmployeeFormNames: Record<keyof CreateEmployeePayload, keyof CreateEmployeePayload> = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
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

export const CreateEmployeeFormLabels: Record<keyof CreateEmployeePayload, string> = {
  firstName: "First name",
  lastName: "Last Name",
  email: "Email",
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

export const CreateEmployeeFormPlaceholder: Record<keyof CreateEmployeePayload, string> = {
  firstName: "Enter first name",
  lastName: "Enter last Name",
  email: "Enter email",
  address: "Enter address",
  city: "Enter city",
  contractType: "Select contract type",
  dateOfBirth: "Select date of Birth",
  gender: "Select Gender",
  hireDate: "Select hire date",
  phoneNumber: "Enter phone number",
  position: "Enter position",
  postalCode: "Enter postal code",
  role: "Select role",
  vacationDays: "Enter vacation days",
  teamsId: "Select teams",
};
