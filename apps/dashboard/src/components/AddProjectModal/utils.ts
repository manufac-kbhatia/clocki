import { ProjectPayload } from "@repo/schemas/rest";

export const CreateProjectFormNames: Record<keyof ProjectPayload, keyof ProjectPayload> = {
  name: "name",
  clientId: "clientId",
  members: "members",
  organisationId: "organisationId",
};

export const CreateProjectFormLabels: Record<keyof ProjectPayload, string> = {
  name: "Name",
  clientId: "Client",
  members: "Project Members",
  organisationId: "-",
};

export const CreateProjectFormPlaceholder: Record<keyof ProjectPayload, string> = {
  name: "Enter Name",
  clientId: "Select the client",
  members: "Select members for the project",
  organisationId: "-",
};

export const ProjectModalMode = {
  Add: "Add",
  Edit: "Edit",
} as const;

export type ProjectModalMode = (typeof ProjectModalMode)[keyof typeof ProjectModalMode];
