import { useState } from "react";
import { Button, Group, SegmentedControl, Stack, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { ProjectTabNames } from "./utilts";
import { ProjectTabNames as ProjectTabNamesType } from "./utilts";
import { useDisclosure } from "@mantine/hooks";
import ClientModal from "../../components/ManageProjects/AddClientModal";
import { ClientModalMode } from "../../components/ManageProjects/AddClientModal/utils";
import ProjectsDetails from "../../components/ManageProjects/ProjectsDetails";
import ClientDetails from "../../components/ManageProjects/ClientsDetails";
import { ProjectModalMode } from "../../components/ManageProjects/AddProjectModal/utils";
import { Client, ProjectWithInfo } from "@repo/schemas/rest";
import ProjectModal from "../../components/ManageProjects/AddProjectModal";

const ManageProjects = () => {
  const [activeTab, setActiveTab] = useState<ProjectTabNamesType>(ProjectTabNames.Projects);
  const [isClientModalOpen, { open: openClientModal, close: closeClientModal }] =
    useDisclosure(false);
  const [isProjectModalOpen, { open: openProjectModal, close: closeProjectModal }] =
    useDisclosure(false);
  const [clientModalMode, setClientModalMode] = useState<ClientModalMode>(ClientModalMode.Add);
  const [clientEdit, setClientEdit] = useState<Client>();
  const [projectModalMode, setProjectModalMode] = useState<ProjectModalMode>(ProjectModalMode.Add);
  const [projectEdit, setProjectEditProject] = useState<ProjectWithInfo>();
  const {colorScheme} = useMantineColorScheme()
  const theme = useMantineTheme();

  const handleClientEdit = (client: Client) => {
    setClientModalMode(ClientModalMode.Edit);
    setClientEdit(client);
    openClientModal();
  };

  const handleProjectEdit = (project: ProjectWithInfo) => {
    setProjectModalMode(ProjectModalMode.Edit);
    setProjectEditProject(project);
    openProjectModal();
  };

  const handleOpenClientModal = () => {
    setClientModalMode(ClientModalMode.Add);
    openClientModal();
  };

  const handleOpenProjectModal = () => {
    setProjectModalMode(ProjectModalMode.Add);
    openProjectModal();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <SegmentedControl
           bg={colorScheme === "light" ? theme.colors.violet[1] : undefined }
           color={theme.primaryColor}
          value={activeTab}
          onChange={(value) => setActiveTab(value as ProjectTabNamesType)}
          data={[ProjectTabNames.Projects, ProjectTabNames.Clients]}
        />
        {activeTab === ProjectTabNames.Projects ? (
          <Button onClick={handleOpenProjectModal}>New Project</Button>
        ) : (
          <Button onClick={handleOpenClientModal}>New Client</Button>
        )}
      </Group>

      {activeTab === ProjectTabNames.Projects && <ProjectsDetails onEdit={handleProjectEdit} />}
      {activeTab === ProjectTabNames.Clients && <ClientDetails onEdit={handleClientEdit} />}

      {isClientModalOpen && (
        <ClientModal
          opened={isClientModalOpen}
          onClose={closeClientModal}
          mode={clientModalMode}
          editClient={clientEdit}
        />
      )}
      {isProjectModalOpen && (
        <ProjectModal
          opened={isProjectModalOpen}
          onClose={closeProjectModal}
          mode={projectModalMode}
          editProject={projectEdit}
        />
      )}
    </Stack>
  );
};

export default ManageProjects;
