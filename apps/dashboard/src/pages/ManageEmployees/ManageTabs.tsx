import { JSX } from "react";
import EmployeesDetails from "../../components/ManageEmployees/EmployeesDetails";
import TeamsDetails from "../../components/ManageEmployees/TeamsDetails";
import AddEmployee from "../../components/ManageEmployees/AddEmployee";
import { TabNames } from "./utils";
import type { TabNames as TabNamesType } from "./utils";
import AddTeam from "../../components/ManageEmployees/AddTeams";

export const ManageTabs: Record<TabNamesType, JSX.Element> = {
  [TabNames.Users]: <EmployeesDetails />,
  [TabNames.Teams]: <TeamsDetails />,
  [TabNames.NewUser]: <AddEmployee />,
  [TabNames.NewTeam]: <AddTeam />,
};
