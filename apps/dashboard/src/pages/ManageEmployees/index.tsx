import { useState } from "react";
import { TabNames } from "./utils";
import type { TabNames as TabNamesType } from "./utils";
import { Button, Group, SegmentedControl, Stack } from "@mantine/core";
import { ManageTabs } from "./ManageTabs";
import { IconUserPlus, IconUsersPlus } from "@tabler/icons-react";

const ManageEmployee = () => {
  const [activeTab, setActiveTab] = useState<TabNamesType>(TabNames.Users);

  return (
    <Stack>
      <Group justify="space-between">
        <SegmentedControl
          color="#09ADC3"
          value={activeTab}
          onChange={(value) => setActiveTab(value as TabNamesType)}
          data={[TabNames.Users, TabNames.Teams]}
        />
        {activeTab === TabNames.Users ? (
          <Button onClick={() => setActiveTab(TabNames.NewUser)} leftSection={<IconUserPlus size={18}/>}>New User</Button>
        ) : activeTab === TabNames.Teams ? (
          <Button onClick={() => setActiveTab(TabNames.NewTeam)} leftSection={<IconUsersPlus size={18}/>}>New Team</Button>
        ) : null}
      </Group>

      {ManageTabs[activeTab]}
    </Stack>
  );
};

export default ManageEmployee;
