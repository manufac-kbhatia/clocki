import { useState } from "react";
import { Button, Group, SegmentedControl, Stack, useMantineTheme } from "@mantine/core";
import { ProjectTabNames } from "./utilts";
import { ProjectTabNames as ProjectTabNamesType } from "./utilts";
import { ManageProjectTabs } from "./ManageProjects";
import { useDisclosure } from "@mantine/hooks";
import AddClientModal from "../../components/AddClientModal";
import AddProjectModal from "../../components/AddProjectModal";

const ManageProjects = () => {
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState<ProjectTabNamesType>(ProjectTabNames.Projects);
  const [isClientModalOpen, { open: openClientModal, close: closeClientModal }] =
    useDisclosure(false);
  const [isProjectModalOpen, { open: openProjectModal, close: closeProjectModal }] =
    useDisclosure(false);

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
          <Button onClick={openProjectModal}>New Project</Button>
        ) : (
          <Button onClick={openClientModal}>New Client</Button>
        )}
      </Group>

      {ManageProjectTabs[activeTab]}
      <AddClientModal opened={isClientModalOpen} onClose={closeClientModal} />
      <AddProjectModal opened={isProjectModalOpen} onClose={closeProjectModal} />
    </Stack>
  );
};

export default ManageProjects;
