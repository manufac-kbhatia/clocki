import { useState } from "react";
import { Button, Group, SegmentedControl, Stack, useMantineTheme } from "@mantine/core";
import { ProjectTabNames } from "./utilts";
import { ProjectTabNames as ProjectTabNamesType } from "./utilts";
import { ManageProjectTabs } from "./ManageProjects";

const ManageProjects = () => {
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState<ProjectTabNamesType>(ProjectTabNames.Projects);

  return (
    <Stack>
      <Group justify="space-between">
        <SegmentedControl
          color={theme.colors.oceanBlue[7]}
          value={activeTab}
          onChange={(value) => setActiveTab(value as ProjectTabNamesType)}
          data={[ProjectTabNames.Projects, ProjectTabNames.Clients]}
        />
        {activeTab === ProjectTabNames.Projects ? (
          <Button onClick={() => setActiveTab(ProjectTabNames.NewProject)}>New Project</Button>
        ) : (
          <Button onClick={() => setActiveTab(ProjectTabNames.NewClient)}>New Client</Button>
        )}
      </Group>

      {ManageProjectTabs[activeTab]}
    </Stack>
  );
};

export default ManageProjects;
