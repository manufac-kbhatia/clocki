import { JSX } from "react";
import EmployeesDetails from "../../components/EmployeesDetails";
import TeamsDetails from "../../components/TeamsDetails";
import AddEmployee from "../../components/AddEmployee";
import { TabNames } from "./utils";
import type { TabNames as TabNamesType } from "./utils";
import AddTeam from "../../components/AddTeams";

export const ManageTabs: Record<TabNamesType, JSX.Element> = {
  [TabNames.Users]: <EmployeesDetails />,
  [TabNames.Teams]: <TeamsDetails />,
  [TabNames.NewUser]: <AddEmployee />,
  [TabNames.NewTeam]: <AddTeam />,
};
