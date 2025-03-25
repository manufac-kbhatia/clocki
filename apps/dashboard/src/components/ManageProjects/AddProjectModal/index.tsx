import { Button, Group, Modal, MultiSelect, Select, Stack, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ProjectSchema } from "@repo/schemas";
import { ProjectPayload, ProjectWithInfo, UpdateProjectPayload } from "@repo/schemas/rest";
import {
  CreateProjectFormLabels,
  CreateProjectFormNames,
  CreateProjectFormPlaceholder,
  ProjectModalMode,
} from "./utils";
import { useEffect } from "react";
import { useClockiContext } from "../../../context";
import { useGetEmployees } from "../../../hooks/api/employee";
import { useGetClients } from "../../../hooks/api/client";
import { useCreateProject, useUpdateProject } from "../../../hooks/api/project";


export interface ProjectModalProps {
  opened: boolean;
  onClose: () => void;
  mode?: ProjectModalMode;
  editProject?: ProjectWithInfo;
}
const ProjectModal = ({ opened, onClose, editProject, mode }: ProjectModalProps) => {
  const { auth } = useClockiContext();
  const { data: employeeData } = useGetEmployees();
  const { data: clientData } = useGetClients();
  const { mutate: createProject } = useCreateProject();
  const { mutate: updateProject } = useUpdateProject();
  const { getInputProps, key, onSubmit, setFieldValue, setValues } = useForm<ProjectPayload>({
    mode: "uncontrolled",
    validate: zodResolver(ProjectSchema),
  });

  const handleSubmit = (values: ProjectPayload) => {
    if (mode === ProjectModalMode.Add) {
      createProject(values);
    } else if (mode === ProjectModalMode.Edit && editProject !== undefined) {
      const payload: UpdateProjectPayload = {
        clientId: values.clientId,
        name: values.name,
        members: values.members,
      };
      updateProject({ payload, id: editProject.id });
    }
  };

  useEffect(() => {
    const organisationId =
      auth?.employee?.createdOrganisation?.id ?? auth?.employee?.organisationId;
    setFieldValue("organisationId", organisationId ?? "");
  }, [auth, setFieldValue]);

  useEffect(() => {
    const organisationId =
      auth?.employee?.createdOrganisation?.id ?? auth?.employee?.organisationId;
    if (mode === ProjectModalMode.Edit) {
      const values: ProjectPayload = {
        name: editProject?.name ?? "",
        clientId: editProject?.clientId ?? "",
        members: editProject?.members.map((member) => member.id),
        organisationId: organisationId ?? "",
      };
      setValues(values);
    }
  }, [auth, mode, setValues, editProject]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={600}>Add new project</Text>}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 4,
      }}
    >
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            {...getInputProps(CreateProjectFormNames.name)}
            key={key(CreateProjectFormNames.name)}
            label={CreateProjectFormLabels.name}
            placeholder={CreateProjectFormPlaceholder.name}
          />
          <Select
            {...getInputProps(CreateProjectFormNames.clientId)}
            key={key(CreateProjectFormNames.clientId)}
            label={CreateProjectFormLabels.clientId}
            placeholder={CreateProjectFormPlaceholder.clientId}
            data={clientData?.clients.map((client) => {
              return { label: client.name, value: client.id };
            })}
          />
          <MultiSelect
            {...getInputProps(CreateProjectFormNames.members)}
            key={key(CreateProjectFormNames.members)}
            label={CreateProjectFormLabels.members}
            placeholder={CreateProjectFormPlaceholder.members}
            data={employeeData?.employees.map((employee) => {
              return {
                label: `${employee.firstName} ${employee.lastName ?? ""}`,
                value: employee.id,
              };
            })}
          />
          <Group justify="center">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="filled" type="submit">
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default ProjectModal;
