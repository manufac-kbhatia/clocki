export const ProjectsAndTeamsTab = {
  Projects: "Projects",
  Teams: "Teams",
} as const;

export type ProjectsAndTeamsTab = (typeof ProjectsAndTeamsTab)[keyof typeof ProjectsAndTeamsTab];
