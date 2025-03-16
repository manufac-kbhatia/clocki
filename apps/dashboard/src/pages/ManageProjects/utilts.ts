export const ProjectTabNames = {
  Projects: "Projects",
  Clients: "Clients",
} as const;

export type ProjectTabNames = (typeof ProjectTabNames)[keyof typeof ProjectTabNames];
