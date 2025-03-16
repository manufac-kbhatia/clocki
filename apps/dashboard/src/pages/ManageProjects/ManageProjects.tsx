import { JSX } from "react";
import { ProjectTabNames } from "./utilts";
import ProjectsDetails from "../../components/ProjectsDetails";
import ClientsDetails from "../../components/ClientsDetails";

export const ManageProjectTabs: Record<ProjectTabNames, JSX.Element> = {
  [ProjectTabNames.Projects]: <ProjectsDetails />,
  [ProjectTabNames.Clients]: <ClientsDetails />,
};
