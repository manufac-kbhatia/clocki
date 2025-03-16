import { Button, Group, Modal, MultiSelect, Select, Stack, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ProjectSchema } from "@repo/schemas";
import { ProjectPayload } from "@repo/schemas/rest";
import {
  CreateProjectFormLabels,
  CreateProjectFormNames,
  CreateProjectFormPlaceholder,
} from "./utils";

export interface AddProjectModalProps {
  opened: boolean;
  onClose: () => void;
}
const AddProjectModal = ({ opened, onClose }: AddProjectModalProps) => {
  const { getInputProps, key, onSubmit } = useForm<ProjectPayload>({
    mode: "uncontrolled",
    validate: zodResolver(ProjectSchema),
  });

  const handleSubmit = (values: ProjectPayload) => {
    console.log(values);
  };

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
          />
          <MultiSelect
            {...getInputProps(CreateProjectFormNames.members)}
            key={key(CreateProjectFormNames.members)}
            label={CreateProjectFormLabels.members}
            placeholder={CreateProjectFormPlaceholder.members}
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

export default AddProjectModal;
