import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useClockiContext } from "../../context";
import { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { UpdatePersonalInfoPayload } from "@repo/schemas/rest";
import { UpdatePersonalInfoSchema } from "@repo/schemas";
import { IconEdit } from "@tabler/icons-react";
import {
  UpdatePersonalInfoFormLabels,
  UpdatePersonalInfoFormNames,
  UpdatePersonalInfoFormPlaceholder,
} from "./utils";

const MySettings = () => {
  const { auth } = useClockiContext();
  const [infoEdit, setInfoEdit] = useState(false);

  const { getInputProps, key, onSubmit } = useForm<UpdatePersonalInfoPayload>({
    mode: "uncontrolled",
    initialValues: {
      firstName: auth?.employee?.firstName,
      lastName: auth?.employee?.lastName ?? "",
      address: auth?.employee?.address ?? "",
      dateOfBirth: auth?.employee?.dateOfBirth ?? undefined,
      city: auth?.employee?.city ?? "",
      postalCode: auth?.employee?.postalCode ?? "",
      phoneNumber: auth?.employee?.phoneNumber ?? "",
    },
    validate: zodResolver(UpdatePersonalInfoSchema),
  });

  const handleSubmit = (value: UpdatePersonalInfoPayload) => {
    console.log(value);
  };

  const handleCancel = () => {
    setInfoEdit(false);
  };

  return (
    <Card withBorder shadow="none">
      <Stack>
        <Text size="xl" fw={700}>
          My settings
        </Text>
        <Grid>
          <Grid.Col span={2}>
            <Card withBorder shadow="none">
              <Avatar
                name={`${auth?.employee?.firstName} ${auth?.employee?.lastName ?? ""}`}
                size={150}
                radius={100}
              />
            </Card>
          </Grid.Col>
          <Grid.Col span={10}>
            <form onSubmit={onSubmit(handleSubmit)}>
              <Stack>
                <Card withBorder shadow="none">
                  <Stack gap={5}>
                    <Group justify="space-between">
                      <Text size="xl" fw={700}>
                        Personal details
                      </Text>
                      <ActionIcon
                        size="md"
                        variant="default"
                        onClick={() => setInfoEdit(!infoEdit)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Text miw={150}>Email</Text>
                      <TextInput
                        variant="filled"
                        flex={1}
                        defaultValue={`${auth?.employee?.email}`}
                        disabled={true}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdatePersonalInfoFormLabels.firstName}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdatePersonalInfoFormNames.firstName)}
                        key={key(UpdatePersonalInfoFormNames.firstName)}
                        placeholder={UpdatePersonalInfoFormPlaceholder.firstName}
                        disabled={infoEdit === false}
                        variant={infoEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdatePersonalInfoFormLabels.lastName}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdatePersonalInfoFormNames.lastName)}
                        key={key(UpdatePersonalInfoFormNames.lastName)}
                        placeholder={UpdatePersonalInfoFormPlaceholder.lastName}
                        disabled={infoEdit === false}
                        variant={infoEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdatePersonalInfoFormLabels.phoneNumber}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdatePersonalInfoFormNames.phoneNumber)}
                        key={key(UpdatePersonalInfoFormNames.phoneNumber)}
                        placeholder={UpdatePersonalInfoFormPlaceholder.phoneNumber}
                        disabled={infoEdit === false}
                        variant={infoEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdatePersonalInfoFormLabels.address}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdatePersonalInfoFormNames.address)}
                        key={key(UpdatePersonalInfoFormNames.address)}
                        placeholder={UpdatePersonalInfoFormPlaceholder.address}
                        disabled={infoEdit === false}
                        variant={infoEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdatePersonalInfoFormLabels.city}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdatePersonalInfoFormNames.city)}
                        key={key(UpdatePersonalInfoFormNames.city)}
                        placeholder={UpdatePersonalInfoFormPlaceholder.city}
                        disabled={infoEdit === false}
                        variant={infoEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdatePersonalInfoFormLabels.postalCode}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdatePersonalInfoFormNames.postalCode)}
                        key={key(UpdatePersonalInfoFormNames.postalCode)}
                        placeholder={UpdatePersonalInfoFormPlaceholder.postalCode}
                        disabled={infoEdit === false}
                        variant={infoEdit === true ? "default" : "filled"}
                      />
                    </Group>
                  </Stack>
                </Card>
                <Group justify="center">
                  <Button variant="outline" onClick={() => handleCancel()}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </Group>
              </Stack>
            </form>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
};

export default MySettings;
