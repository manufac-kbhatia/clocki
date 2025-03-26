import {
  Card,
  SegmentedControl,
  Stack,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import { ProjectsAndTeamsTab } from "./utils";
import { useState } from "react";
import { ManageProjectsAndTeamsTabs } from "./ManageProjectsAndTeamsTab";

const ProjectsAndTeams = () => {
  const [activeTab, setActiveTab] = useState<ProjectsAndTeamsTab>(ProjectsAndTeamsTab.Projects);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <Card withBorder shadow="none" h="100%">
      <Stack>
        <SegmentedControl
          bg={colorScheme === "light" ? theme.colors.violet[1] : undefined}
          color={theme.primaryColor}
          value={activeTab}
          onChange={(value) => setActiveTab(value as ProjectsAndTeamsTab)}
          data={Object.values(ProjectsAndTeamsTab)}
        />
        {ManageProjectsAndTeamsTabs[activeTab]}
      </Stack>
    </Card>
  );
};

export default ProjectsAndTeams;
