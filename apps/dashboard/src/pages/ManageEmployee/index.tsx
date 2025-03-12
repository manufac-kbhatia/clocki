import { Tabs } from "@mantine/core";
import { IconUser, IconUserPlus, IconUsersGroup } from "@tabler/icons-react";
import EmployeeTabs from "../../components/EmployeeTabs";

const ManageEmployee = () => {
  return (
    <Tabs variant="pills" defaultValue="users">
      <Tabs.List>
        <Tabs.Tab value="users" leftSection={<IconUser size={18} />}>
          User
        </Tabs.Tab>
        <Tabs.Tab value="teams" leftSection={<IconUsersGroup size={18} />}>
          Teams
        </Tabs.Tab>

        <Tabs.Tab value="create" ml="auto" leftSection={<IconUserPlus size={18} />}>
          New user
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="users">Users</Tabs.Panel>

      <Tabs.Panel value="teams">Teams</Tabs.Panel>

      <Tabs.Panel value="create">
        <EmployeeTabs />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ManageEmployee;
