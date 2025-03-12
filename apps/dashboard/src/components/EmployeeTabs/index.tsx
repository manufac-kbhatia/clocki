import { Button, Card, Group, MultiSelect, NumberInput, Select, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ContractType, EmployeeSchema, Gender, Role } from "@repo/schemas";
import { EmployeePayload } from "@repo/schemas/rest";
import {
  CreateEmployeeFormLabels,
  CreateEmployeeFormNames,
  CreateEmployeeFormPlaceholder,
} from "./utils";
import { DateInput } from '@mantine/dates';
import { IconCalendar } from "@tabler/icons-react";

const EmployeeTabs = () => {
  const { getInputProps, key, onSubmit } = useForm<EmployeePayload>({
    mode: "uncontrolled",
    validate: zodResolver(EmployeeSchema),
  });

  const handleSubmit = (data: EmployeePayload) => {
    console.group(data);
  }
  
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder m="xl">
    <Title order={1} fw={800} mb="xs">Add new user</Title>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack gap={50}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={700} mb="xs">Personal info</Text>
            <SimpleGrid
              cols={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 10, sm: "lg" }}
              verticalSpacing={{ base: "md", sm: "xs" }}
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
                rightSection={<IconCalendar size={20} />}
                {...getInputProps(CreateEmployeeFormNames.dateOfBirth)}
                key={key(CreateEmployeeFormNames.dateOfBirth)}
                label={CreateEmployeeFormLabels.dateOfBirth}
                placeholder={CreateEmployeeFormPlaceholder.dateOfBirth}
              />
              <Select
                {...getInputProps(CreateEmployeeFormNames.gender)}
                key={key(CreateEmployeeFormNames.gender)}
                data={Object.values(Gender)}
                label={CreateEmployeeFormLabels.gender}
                placeholder={CreateEmployeeFormPlaceholder.gender}
              />
            </SimpleGrid>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text fw={700} mb="xs">Employment info</Text>
            <SimpleGrid
              cols={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 10, sm: "lg" }}
              verticalSpacing={{ base: "md", sm: "xs" }}
            >
             <DateInput
                rightSection={<IconCalendar size={20} />}
                {...getInputProps(CreateEmployeeFormNames.hireDate)}
                key={key(CreateEmployeeFormNames.hireDate)}
                label={CreateEmployeeFormLabels.hireDate}
                placeholder={CreateEmployeeFormPlaceholder.hireDate}
              />
              <Select
                {...getInputProps(CreateEmployeeFormNames.contractType)}
                key={key(CreateEmployeeFormNames.contractType)}
                data={Object.values(ContractType)}
                label={CreateEmployeeFormLabels.contractType}
                placeholder={CreateEmployeeFormPlaceholder.contractType}
              />
              <Select
                {...getInputProps(CreateEmployeeFormNames.role)}
                key={key(CreateEmployeeFormNames.role)}
                data={Object.values(Role)}
                label={CreateEmployeeFormLabels.role}
                placeholder={CreateEmployeeFormPlaceholder.role}
              />
              <TextInput
                {...getInputProps(CreateEmployeeFormNames.position)}
                key={key(CreateEmployeeFormNames.position)}
                label={CreateEmployeeFormLabels.position}
                placeholder={CreateEmployeeFormPlaceholder.position}
              />
              <MultiSelect
                {...getInputProps(CreateEmployeeFormNames.teamsId)}
                key={key(CreateEmployeeFormNames.teamsId)}
                label={CreateEmployeeFormLabels.teamsId}
                data={["A", "B"]}
                placeholder={CreateEmployeeFormPlaceholder.teamsId}
              />
              <NumberInput
                {...getInputProps(CreateEmployeeFormNames.vacationDays)}
                key={key(CreateEmployeeFormNames.vacationDays)}
                label={CreateEmployeeFormLabels.vacationDays}
                placeholder={CreateEmployeeFormPlaceholder.vacationDays}
              />
              
            </SimpleGrid>
          </Card>
          <Group justify="center">
            <Button variant="outline" type="button">Cancel</Button>
            <Button variant="filled" type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
};

export default EmployeeTabs;
