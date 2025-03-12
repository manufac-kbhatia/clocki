import { useState } from "react";
import { TabNames } from "./utils";
import type { TabNames as TabNamesType } from "./utils";
import { Button, Group, SegmentedControl, Stack, useMantineTheme } from "@mantine/core";
import { ManageTabs } from "./ManageTabs";

const ManageEmployee = () => {
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState<TabNamesType>(TabNames.Users);

  return (
    <Stack>
      <Group justify="space-between">
        <SegmentedControl
          color={theme.colors.blue[6]}
          value={activeTab}
          onChange={(value) => setActiveTab(value as TabNamesType)}
          data={[TabNames.Users, TabNames.Teams]}
        />
        {activeTab === TabNames.Users ? (
          <Button onClick={() => setActiveTab(TabNames.NewUser)}>New User</Button>
        ) : (
          <Button onClick={() => setActiveTab(TabNames.NewTeam)}>New Team</Button>
        )}
      </Group>

      {ManageTabs[activeTab]}
    </Stack>
  );
};

export default ManageEmployee;
