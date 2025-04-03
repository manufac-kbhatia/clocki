import { Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ClientSchema } from "@repo/schemas";
import { Client, ClientPayload } from "@repo/schemas/rest";
import {
  ClientModalMode,
  CreateClientFormLabels,
  CreateClientFormNames,
  CreateClientFormPlaceholder,
} from "./utils";
import { useClockiContext } from "../../../context";
import { useEffect } from "react";
import { useCreateClient, useUpdateClient } from "../../../hooks/api/client";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

export interface ClientModalProps {
  opened: boolean;
  onClose: () => void;
  mode?: ClientModalMode;
  editClient?: Client;
}
const ClientModal = ({ opened, onClose, mode, editClient }: ClientModalProps) => {
  const { auth } = useClockiContext();
  const queryClient = useQueryClient();
  const { mutate: createClient, isPending } = useCreateClient({
    onSuccess: async () => {
      notifications.show({
        title: "Client added",
        message: "",
      });
      onClose();
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },

    onError: () => {
      notifications.show({
        title: "Failed",
        message: "",
        color: "red",
      });
    },
  });
  const { mutate: updateClient, isPending: isClientUpdating } = useUpdateClient({
    onSuccess: async () => {
      notifications.show({
        title: "Client updated",
        message: "",
      });
      onClose();
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },

    onError: () => {
      notifications.show({
        title: "Failed",
        message: "",
        color: "red",
      });
    },
  });
  const { getInputProps, key, onSubmit, setFieldValue, setValues } = useForm<ClientPayload>({
    mode: "uncontrolled",
    validate: zodResolver(ClientSchema),
  });

  const handleSubmit = (values: ClientPayload) => {
    if (mode === ClientModalMode.Add) {
      createClient(values);
    } else if (mode === ClientModalMode.Edit && editClient) {
      updateClient({ payload: values, id: editClient.id });
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
        name: editClient?.name ?? "",
        address: editClient?.address ?? "",
        organisationId: organisationId ?? "",
        email: editClient?.email ?? "",
        city: editClient?.city ?? "",
        phoneNumber: editClient?.phoneNumber ?? "",
      };
      setValues(values);
    }
  }, [editClient, auth, mode, setValues]);

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
            <Button variant="filled" type="submit" loading={isPending || isClientUpdating}>
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default ClientModal;
