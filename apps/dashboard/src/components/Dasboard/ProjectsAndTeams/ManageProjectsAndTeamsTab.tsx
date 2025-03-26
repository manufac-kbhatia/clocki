import { JSX } from "react";
import { ProjectsAndTeamsTab, type ProjectsAndTeamsTab as ProjectsAndTeamsTabType } from "./utils";
import MyProjects from "./MyProjects";
import MyTeams from "./MyTeams";

export const ManageProjectsAndTeamsTabs: Record<ProjectsAndTeamsTabType, JSX.Element> = {
  [ProjectsAndTeamsTab.Projects]: <MyProjects />,
  [ProjectsAndTeamsTab.Teams]: <MyTeams />,
};
