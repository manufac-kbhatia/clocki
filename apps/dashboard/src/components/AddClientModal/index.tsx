import { Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ClientSchema } from "@repo/schemas";
import { ClientPayload } from "@repo/schemas/rest";
import {
  ClientModalMode,
  CreateClientFormLabels,
  CreateClientFormNames,
  CreateClientFormPlaceholder,
} from "./utils";
import { useCreateClient, useGetClient, useUpdateClient } from "../../hooks/api";
import { useClockiContext } from "../../context";
import { useEffect } from "react";

export interface ClientModalProps {
  opened: boolean;
  onClose: () => void;
  mode?: ClientModalMode;
  editId?: string;
}
const ClientModal = ({ opened, onClose, mode, editId }: ClientModalProps) => {
  const { auth } = useClockiContext();
  const { mutate: createClient } = useCreateClient();
  const { mutate: updateClient } = useUpdateClient();
  const { data: clientData } = useGetClient(editId);
  const { getInputProps, key, onSubmit, setFieldValue, setValues } = useForm<ClientPayload>({
    mode: "uncontrolled",
    validate: zodResolver(ClientSchema),
  });

  const handleSubmit = (values: ClientPayload) => {
    if (mode === ClientModalMode.Add) {
      createClient(values);
    } else if (mode === ClientModalMode.Edit && typeof editId === "string") {
      updateClient({ payload: values, id: editId });
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
    if (mode === ClientModalMode.Edit) {
      const values: ClientPayload = {
        name: clientData?.client.name ?? "",
        address: clientData?.client.address ?? "",
        organisationId: organisationId ?? "",
        email: clientData?.client.email ?? "",
        city: clientData?.client.city ?? "",
        phoneNumber: clientData?.client.phoneNumber ?? "",
      };
      setValues(values);
    }
  }, [clientData, auth, mode, setValues]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={600}>Add new client</Text>}
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
            {...getInputProps(CreateClientFormNames.phoneNumber)}
            key={key(CreateClientFormNames.phoneNumber)}
            label={CreateClientFormLabels.phoneNumber}
            placeholder={CreateClientFormPlaceholder.phoneNumber}
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
            <Button variant="outline" onClick={onClose} type="button">
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

export default ClientModal;
