import { JSX } from "react";
import EmployeeTab from "../../components/EmployeeTabs";
import TeamTab from "../../components/TeamTabs";
import AddEmployeeTab from "../../components/AddEmployeeTabs";
import { TabNames } from "./utils";
import type { TabNames as TabNamesType } from "./utils";
import AddTeam from "../../components/AddTeams";

export const ManageTabs: Record<TabNamesType, JSX.Element> = {
  [TabNames.Users]: <EmployeeTab />,
  [TabNames.Teams]: <TeamTab />,
  [TabNames.NewUser]: <AddEmployeeTab />,
  [TabNames.NewTeam]: <AddTeam />,
};
