import { Button, Card, Group, Select, SimpleGrid, Stack, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { EmployeeSchema } from "@repo/schemas";
import { EmployeePayload } from "@repo/schemas/rest";
import {
  CreateEmployeeFormLabels,
  CreateEmployeeFormNames,
  CreateEmployeeFormPlaceholder,
} from "./utils";
import { DateInput } from '@mantine/dates';

const EmployeeTabs = () => {
  const { getInputProps, key } = useForm<EmployeePayload>({
    validate: zodResolver(EmployeeSchema),
  });
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder m="xl">
    <Title order={2} fw={800} mb="xs">Add new user</Title>
      <form>
        <Stack gap={50}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title mb="xs">Personal info</Title>
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing={{ base: 10, sm: "xl" }}
              verticalSpacing={{ base: "md", sm: "xl" }}
            >
              <TextInput
                {...getInputProps(CreateEmployeeFormNames.email)}
                key={key(CreateEmployeeFormNames.email)}
                label={CreateEmployeeFormLabels.email}
                placeholder={CreateEmployeeFormPlaceholder.email}
              />
              <TextInput
                {...getInputProps(CreateEmployeeFormNames.firstName)}
                key={key(CreateEmployeeFormNames.firstName)}
                label={CreateEmployeeFormLabels.firstName}
                placeholder={CreateEmployeeFormPlaceholder.firstName}
              />
              <TextInput
                {...getInputProps(CreateEmployeeFormNames.lastName)}
                key={key(CreateEmployeeFormNames.lastName)}
                label={CreateEmployeeFormLabels.lastName}
                placeholder={CreateEmployeeFormPlaceholder.lastName}
              />
              <TextInput
                {...getInputProps(CreateEmployeeFormNames.address)}
                key={key(CreateEmployeeFormNames.address)}
                label={CreateEmployeeFormLabels.address}
                placeholder={CreateEmployeeFormPlaceholder.address}
              />
              <TextInput
                {...getInputProps(CreateEmployeeFormNames.city)}
                key={key(CreateEmployeeFormNames.city)}
                label={CreateEmployeeFormLabels.city}
                placeholder={CreateEmployeeFormPlaceholder.city}
              />
              <TextInput
                {...getInputProps(CreateEmployeeFormNames.postalCode)}
                key={key(CreateEmployeeFormNames.postalCode)}
                label={CreateEmployeeFormLabels.postalCode}
                placeholder={CreateEmployeeFormPlaceholder.postalCode}
              />
              <TextInput
                {...getInputProps(CreateEmployeeFormNames.phoneNumber)}
                key={key(CreateEmployeeFormNames.phoneNumber)}
                label={CreateEmployeeFormLabels.phoneNumber}
                placeholder={CreateEmployeeFormPlaceholder.phoneNumber}
              />
              <DateInput
                {...getInputProps(CreateEmployeeFormNames.dateOfBirth)}
                key={key(CreateEmployeeFormNames.dateOfBirth)}
                label={CreateEmployeeFormLabels.dateOfBirth}
                placeholder={CreateEmployeeFormPlaceholder.dateOfBirth}
              />
              <Select
                {...getInputProps(CreateEmployeeFormNames.gender)}
                key={key(CreateEmployeeFormNames.gender)}
                label={CreateEmployeeFormLabels.gender}
                placeholder={CreateEmployeeFormPlaceholder.gender}
              />
            </SimpleGrid>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title mb="xs">Employment info</Title>
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing={{ base: 10, sm: "xl" }}
              verticalSpacing={{ base: "md", sm: "xl" }}
            >
             <DateInput
                {...getInputProps(CreateEmployeeFormNames.hireDate)}
                key={key(CreateEmployeeFormNames.hireDate)}
                label={CreateEmployeeFormLabels.hireDate}
                placeholder={CreateEmployeeFormPlaceholder.hireDate}
              />
              <Select
                {...getInputProps(CreateEmployeeFormNames.contractType)}
                key={key(CreateEmployeeFormNames.contractType)}
                label={CreateEmployeeFormLabels.contractType}
                placeholder={CreateEmployeeFormPlaceholder.contractType}
              />
              <Select
                {...getInputProps(CreateEmployeeFormNames.position)}
                key={key(CreateEmployeeFormNames.position)}
                label={CreateEmployeeFormLabels.position}
                placeholder={CreateEmployeeFormPlaceholder.position}
              />
              <Select
                {...getInputProps(CreateEmployeeFormNames.teamsId)}
                key={key(CreateEmployeeFormNames.teamsId)}
                label={CreateEmployeeFormLabels.teamsId}
                placeholder={CreateEmployeeFormPlaceholder.teamsId}
              />
              <TextInput
                {...getInputProps(CreateEmployeeFormNames.vacationDays)}
                key={key(CreateEmployeeFormNames.vacationDays)}
                label={CreateEmployeeFormLabels.vacationDays}
                placeholder={CreateEmployeeFormPlaceholder.vacationDays}
              />
              
            </SimpleGrid>
          </Card>
          <Group justify="center">
            <Button variant="outline">Cancel</Button>
            <Button variant="filled">Save</Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
};

export default EmployeeTabs;
