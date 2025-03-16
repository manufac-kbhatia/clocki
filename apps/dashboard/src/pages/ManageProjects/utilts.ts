export const ProjectTabNames = {
    Projects: "Projects",
    Clients: "Clients",
    NewProject: "New Project",
    NewClient: "New Client",
  } as const;
  
  export type ProjectTabNames = (typeof ProjectTabNames)[keyof typeof ProjectTabNames];
  