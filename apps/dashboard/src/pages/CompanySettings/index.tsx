import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useGetOrganisation } from "../../hooks/api";
import { useClockiContext } from "../../context";
import { useForm, zodResolver } from "@mantine/form";
import { UpdateOrganisationPayload } from "@repo/schemas/rest";
import { UpdateOrganisationSchema } from "@repo/schemas";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  UpdateOrganisationFormLabels,
  UpdateOrganisationFormNames,
  UpdateOrganisationFormPlaceholder,
} from "./utils";

const CompanySettings = () => {
  const { data } = useGetOrganisation();
  const { auth } = useClockiContext();
  const [organisationEdit, setOrganisationEdit] = useState(false);

  const { getInputProps, key, onSubmit, setValues } = useForm<UpdateOrganisationPayload>({
    mode: "uncontrolled",
    validate: zodResolver(UpdateOrganisationSchema),
  });

  const handleSubmit = (value: UpdateOrganisationPayload) => {
    console.log(value);
  };

  const handleCancel = () => {
    setOrganisationEdit(false);
  };

  useEffect(() => {
    const values: UpdateOrganisationPayload = {
      address: data?.organisation.address,
      city: data?.organisation.city,
      companyName: data?.organisation.name,
      vatNumber: data?.organisation.vatNumber,
    };
    setValues(values)
  },[data, setValues])

  return (
    <Card withBorder shadow="xl">
      <Stack gap="xs">
        <Title>Company Settings</Title>
        <Grid>
          <Grid.Col span={6}>
            <form onSubmit={onSubmit(handleSubmit)}>
              <Stack>
                <Card withBorder>
                  <Stack gap={5}>
                    <Group justify="space-between">
                      <Text size="xl" fw={700}>
                        Details
                      </Text>
                      <ActionIcon
                        size="xs"
                        variant="white"
                        onClick={() => setOrganisationEdit(!organisationEdit)}
                      >
                        <IconEdit />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Text miw={150}>Responsible person</Text>
                      <TextInput
                        variant="filled"
                        flex={1}
                        defaultValue={`${auth?.employee?.firstName} ${auth?.employee?.lastName ?? ""}`}
                        disabled={true}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateOrganisationFormLabels.companyName}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateOrganisationFormNames.companyName)}
                        key={key(UpdateOrganisationFormNames.companyName)}
                        placeholder={UpdateOrganisationFormPlaceholder.companyName}
                        disabled={organisationEdit === false}
                        variant={organisationEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateOrganisationFormLabels.address}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateOrganisationFormNames.address)}
                        key={key(UpdateOrganisationFormNames.address)}
                        placeholder={UpdateOrganisationFormPlaceholder.address}
                        disabled={organisationEdit === false}
                        variant={organisationEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateOrganisationFormLabels.city}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateOrganisationFormNames.city)}
                        key={key(UpdateOrganisationFormNames.city)}
                        placeholder={UpdateOrganisationFormPlaceholder.city}
                        disabled={organisationEdit === false}
                        variant={organisationEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateOrganisationFormLabels.vatNumber}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateOrganisationFormNames.vatNumber)}
                        key={key(UpdateOrganisationFormNames.vatNumber)}
                        placeholder={UpdateOrganisationFormPlaceholder.vatNumber}
                        disabled={organisationEdit === false}
                        variant={organisationEdit === true ? "default" : "filled"}
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
          <Grid.Col span={6}>
            <Card withBorder>
              <Stack gap="xs">
                <Text size="xl" fw={700}>
                  Admins
                </Text>
                <Text size="xs">
                  Cloki allows admins to view documentation, close sick leaves and parental leaves,
                  add collective vacations, automatically generate decisions and work hour reports,
                  and organize teams.
                </Text>
                <SimpleGrid cols={2}>
                  <Text fw={600}>Users</Text>
                  <Text fw={600}>Email</Text>
                </SimpleGrid>
                <Divider />
                <SimpleGrid cols={2}>
                  {auth?.employee?.createdOrganisation && (
                    <>
                      <Text>
                        {auth.employee.firstName ?? ""} {auth.employee.lastName ?? ""}{" "}
                      </Text>
                      <Text>{auth.employee.email}</Text>
                    </>
                  )}
                  {data?.organisation.employees.map((employee) => {
                    return (
                      <>
                        <Text>
                          {employee.firstName ?? ""} {employee.lastName ?? ""}
                        </Text>
                        <Text>{employee.email}</Text>
                      </>
                    );
                  })}
                </SimpleGrid>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
};

export default CompanySettings;
