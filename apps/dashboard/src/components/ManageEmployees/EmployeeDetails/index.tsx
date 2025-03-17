import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Grid,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconArrowNarrowLeft, IconCalendar, IconEdit } from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { useGetEmployee } from "../../../hooks/api";
import { UpdateEmployeePayload } from "@repo/schemas/rest";
import { useForm, zodResolver } from "@mantine/form";
import { Gender, Role, UpdateEmployeeSchema } from "@repo/schemas";
import {
  UpdateEmployeeFormLabels,
  UpdateEmployeeFormNames,
  UpdateEmployeeFormPlaceholder,
} from "./utils";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { data } = useGetEmployee(id);
  const [employeeDetailEdit, setEmployeeDetailEdit] = useState(false);
  const [employeeInfoDetailEdit, setEmployeeInfoDetailEdit] = useState(false);
  const [addressDetailEdit, setAddressDetailEdit] = useState(false);

  const { getInputProps, key, onSubmit, setValues } = useForm<UpdateEmployeePayload>({
    mode: "uncontrolled",
    validate: zodResolver(UpdateEmployeeSchema),
  });

  const name = `${data?.employee.firstName ?? ""} ${data?.employee.lastName ?? ""}`;

  const handleSubmit = (value: UpdateEmployeePayload) => {
    console.log(value);
  };

  const handleCancel = () => {
    setEmployeeDetailEdit(false);
    setEmployeeInfoDetailEdit(false);
    setAddressDetailEdit(false);
  };

  useEffect(() => {
    const values: UpdateEmployeePayload = {
      firstName: data?.employee.firstName,
      lastName: data?.employee.lastName ?? undefined,
      address: data?.employee.address ?? undefined,
      city: data?.employee.city ?? undefined,
      gender: data?.employee.gender ?? undefined,
      role: data?.employee.role,
      contractType: data?.employee.employeeInfo?.contractType ?? undefined,
      dateOfBirth: data?.employee.dateOfBirth ?? undefined,
      hireDate: data?.employee.employeeInfo?.hireDate ?? undefined,
      phoneNumber: data?.employee.phoneNumber ?? undefined,
      position: data?.employee.employeeInfo?.position ?? undefined,
      postalCode: data?.employee.postalCode ?? undefined,
    };
    setValues(values);
  }, [data, setValues]);

  return (
    <Stack>
      <Link
        to="/manage-users"
        style={{ alignSelf: "flex-end", textDecoration: "none", color: "inherit" }}
      >
        <Group gap={5}>
          <ThemeIcon size="sm" variant="transparent">
            <IconArrowNarrowLeft />
          </ThemeIcon>
          <Text>Users list</Text>
        </Group>
      </Link>
      <Card shadow="xl" withBorder>
        <Group>
          <Avatar variant="filled" radius={500} name={name} size={"xl"} />
          <Title>{name}</Title>
        </Group>
      </Card>

      <Card withBorder shadow="xl">
        <Text>User details</Text>
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid grow>
            <Grid.Col span={6}>
              <Card shadow="xl" withBorder>
                <Stack gap={5}>
                  <Group justify="space-between">
                    <Text>Personal info</Text>
                    <ActionIcon
                      size="md"
                      variant="default"
                      onClick={() => setEmployeeDetailEdit(!employeeDetailEdit)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Group>
                  <Group>
                    <Text miw={150}>Email</Text>
                    <TextInput
                      variant="filled"
                      flex={1}
                      defaultValue={data?.employee.email}
                      disabled={true}
                    />
                  </Group>
                  <Group>
                    <Text miw={150}>{UpdateEmployeeFormLabels.firstName}</Text>
                    <TextInput
                      flex={1}
                      {...getInputProps(UpdateEmployeeFormNames.firstName)}
                      key={key(UpdateEmployeeFormNames.firstName)}
                      placeholder={UpdateEmployeeFormPlaceholder.firstName}
                      disabled={employeeDetailEdit === false}
                      variant={employeeDetailEdit === true ? "default" : "filled"}
                    />
                  </Group>
                  <Group>
                    <Text miw={150}>{UpdateEmployeeFormLabels.lastName}</Text>
                    <TextInput
                      flex={1}
                      {...getInputProps(UpdateEmployeeFormNames.lastName)}
                      key={key(UpdateEmployeeFormNames.lastName)}
                      placeholder={UpdateEmployeeFormPlaceholder.lastName}
                      disabled={employeeDetailEdit === false}
                      variant={employeeDetailEdit === true ? "default" : "filled"}
                    />
                  </Group>
                  <Group>
                    <Text miw={150}>{UpdateEmployeeFormLabels.phoneNumber}</Text>
                    <TextInput
                      flex={1}
                      {...getInputProps(UpdateEmployeeFormNames.phoneNumber)}
                      key={key(UpdateEmployeeFormNames.phoneNumber)}
                      placeholder={UpdateEmployeeFormPlaceholder.phoneNumber}
                      disabled={employeeDetailEdit === false}
                      variant={employeeDetailEdit === true ? "default" : "filled"}
                    />
                  </Group>
                  <Group>
                    <Text miw={150}>{UpdateEmployeeFormLabels.dateOfBirth}</Text>
                    <DateInput
                      flex={1}
                      rightSection={<IconCalendar size={20} />}
                      {...getInputProps(UpdateEmployeeFormNames.dateOfBirth)}
                      key={key(UpdateEmployeeFormNames.dateOfBirth)}
                      placeholder={UpdateEmployeeFormPlaceholder.dateOfBirth}
                      disabled={employeeDetailEdit === false}
                      variant={employeeDetailEdit === true ? "default" : "filled"}
                    />
                  </Group>
                  <Group>
                    <Text miw={150}>{UpdateEmployeeFormLabels.gender}</Text>
                    <Select
                      flex={1}
                      {...getInputProps(UpdateEmployeeFormNames.gender)}
                      key={key(UpdateEmployeeFormNames.gender)}
                      data={Object.values(Gender)}
                      placeholder={UpdateEmployeeFormPlaceholder.gender}
                      disabled={employeeDetailEdit === false}
                      variant={employeeDetailEdit === true ? "default" : "filled"}
                    />
                  </Group>
                  <Group>
                    <Text miw={150}>{UpdateEmployeeFormLabels.role}</Text>
                    <Select
                      flex={1}
                      {...getInputProps(UpdateEmployeeFormNames.role)}
                      key={key(UpdateEmployeeFormNames.role)}
                      data={Object.values(Role)}
                      placeholder={UpdateEmployeeFormPlaceholder.role}
                      disabled={employeeDetailEdit === false}
                      variant={employeeDetailEdit === true ? "default" : "filled"}
                    />
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack>
                <Card shadow="xl" withBorder>
                  <Stack gap={5}>
                    <Group justify="space-between">
                      <Text>Employment info</Text>
                      <ActionIcon
                        size="md"
                        variant="default"
                        onClick={() => setEmployeeInfoDetailEdit(!employeeInfoDetailEdit)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateEmployeeFormLabels.position}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateEmployeeFormNames.position)}
                        key={key(UpdateEmployeeFormNames.position)}
                        placeholder={UpdateEmployeeFormPlaceholder.position}
                        disabled={employeeInfoDetailEdit === false}
                        variant={employeeInfoDetailEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateEmployeeFormLabels.contractType}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateEmployeeFormNames.contractType)}
                        key={key(UpdateEmployeeFormNames.contractType)}
                        placeholder={UpdateEmployeeFormPlaceholder.contractType}
                        disabled={employeeInfoDetailEdit === false}
                        variant={employeeInfoDetailEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateEmployeeFormLabels.vacationDays}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateEmployeeFormNames.vacationDays)}
                        key={key(UpdateEmployeeFormNames.vacationDays)}
                        placeholder={UpdateEmployeeFormPlaceholder.vacationDays}
                        disabled={employeeInfoDetailEdit === false}
                        variant={employeeInfoDetailEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateEmployeeFormLabels.hireDate}</Text>
                      <DateInput
                        flex={1}
                        rightSection={<IconCalendar size={20} />}
                        {...getInputProps(UpdateEmployeeFormNames.hireDate)}
                        key={key(UpdateEmployeeFormNames.hireDate)}
                        placeholder={UpdateEmployeeFormPlaceholder.hireDate}
                        disabled={employeeInfoDetailEdit === false}
                        variant={employeeInfoDetailEdit === true ? "default" : "filled"}
                      />
                    </Group>
                  </Stack>
                </Card>
                <Card shadow="xl" withBorder>
                  <Stack gap={5}>
                    <Group justify="space-between">
                      <Text>Address</Text>
                      <ActionIcon
                        size="md"
                        variant="default"
                        onClick={() => setAddressDetailEdit(!addressDetailEdit)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateEmployeeFormLabels.address}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateEmployeeFormNames.address)}
                        key={key(UpdateEmployeeFormNames.address)}
                        placeholder={UpdateEmployeeFormPlaceholder.address}
                        disabled={addressDetailEdit === false}
                        variant={addressDetailEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateEmployeeFormLabels.city}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateEmployeeFormNames.city)}
                        key={key(UpdateEmployeeFormNames.city)}
                        placeholder={UpdateEmployeeFormPlaceholder.city}
                        disabled={addressDetailEdit === false}
                        variant={addressDetailEdit === true ? "default" : "filled"}
                      />
                    </Group>
                    <Group>
                      <Text miw={150}>{UpdateEmployeeFormLabels.postalCode}</Text>
                      <TextInput
                        flex={1}
                        {...getInputProps(UpdateEmployeeFormNames.postalCode)}
                        key={key(UpdateEmployeeFormNames.postalCode)}
                        placeholder={UpdateEmployeeFormPlaceholder.postalCode}
                        disabled={addressDetailEdit === false}
                        variant={addressDetailEdit === true ? "default" : "filled"}
                      />
                    </Group>
                  </Stack>
                </Card>
              </Stack>
            </Grid.Col>
          </Grid>
          <Group>
            <Button variant="outline" onClick={() => handleCancel()}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Card>
    </Stack>
  );
};

export default EmployeeDetails;
