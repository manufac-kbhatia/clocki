import { Button, Group, Modal, Stack, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ClientSchema } from "@repo/schemas";
import { ClientPayload } from "@repo/schemas/rest";
import {
  CreateClientFormLabels,
  CreateClientFormNames,
  CreateClientFormPlaceholder,
} from "./utils";

export interface AddClientModalProps {
  opened: boolean;
  onClose: () => void;
}
const AddClientModal = ({ opened, onClose }: AddClientModalProps) => {
  const { getInputProps, key, onSubmit } = useForm<ClientPayload>({
    mode: "uncontrolled",
    validate: zodResolver(ClientSchema),
  });

  const handleSubmit = (values: ClientPayload) => {
    console.log(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title>Add new client</Title>}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 4,
      }}
    >
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            {...getInputProps(CreateClientFormNames.name)}
            key={key(CreateClientFormNames.name)}
            label={CreateClientFormLabels.name}
            placeholder={CreateClientFormPlaceholder.name}
          />
          <TextInput
            {...getInputProps(CreateClientFormNames.email)}
            key={key(CreateClientFormNames.email)}
            label={CreateClientFormLabels.email}
            placeholder={CreateClientFormPlaceholder.email}
          />
          <TextInput
            {...getInputProps(CreateClientFormNames.address)}
            key={key(CreateClientFormNames.address)}
            label={CreateClientFormLabels.address}
            placeholder={CreateClientFormPlaceholder.address}
          />
          <TextInput
            {...getInputProps(CreateClientFormNames.city)}
            key={key(CreateClientFormNames.city)}
            label={CreateClientFormLabels.city}
            placeholder={CreateClientFormPlaceholder.city}
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

export default AddClientModal;
