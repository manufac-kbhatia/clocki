import { JSX } from "react";
import { ProjectTabNames } from "./utilts";
import ProjectsDetails from "../../components/ProjectsDetails";
import ClientsDetails from "../../components/ClientsDetails";
import { Text } from "@mantine/core";

export const ManageProjectTabs: Record<ProjectTabNames, JSX.Element> = {
  [ProjectTabNames.Projects]: <ProjectsDetails />,
  [ProjectTabNames.Clients]: <ClientsDetails />,
  [ProjectTabNames.NewProject]: <Text>Add New projct</Text>,
  [ProjectTabNames.NewClient]: <Text>Add New client</Text>,
};
