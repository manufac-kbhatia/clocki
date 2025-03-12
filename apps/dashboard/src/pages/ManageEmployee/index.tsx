import { Tabs } from "@mantine/core";
import { IconUser, IconUserPlus, IconUsersGroup, IconUsersPlus } from "@tabler/icons-react";
import EmployeeTabs from "../../components/EmployeeTabs";
import { useState } from "react";
import { TabNames } from "./utils";

const ManageEmployee = () => {
  const [activeTab, setActiveTab] = useState<string | null>(TabNames[0]);

  return (
    <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value={TabNames[0]} leftSection={<IconUser size={18} />}>
          User
        </Tabs.Tab>
        <Tabs.Tab value={TabNames[1]} leftSection={<IconUsersGroup size={18} />}>
          Teams
        </Tabs.Tab>

        {activeTab === TabNames[0] || activeTab === TabNames[2] ? (
          <Tabs.Tab value={TabNames[2]} ml="auto" leftSection={<IconUserPlus size={18} />}>
            New User
          </Tabs.Tab>
        ) : (
          <Tabs.Tab value={TabNames[3]} ml="auto" leftSection={<IconUsersPlus size={18} />}>
            New Team
          </Tabs.Tab>
        )}
      </Tabs.List>

      <Tabs.Panel value={TabNames[0]}>Users</Tabs.Panel>

      <Tabs.Panel value={TabNames[1]}>Teams</Tabs.Panel>

      <Tabs.Panel value={TabNames[2]}>
        <EmployeeTabs />
      </Tabs.Panel>

      <Tabs.Panel value={TabNames[3]}>Add Teams here</Tabs.Panel>
    </Tabs>
  );
};

export default ManageEmployee;
