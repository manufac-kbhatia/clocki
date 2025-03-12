import { Card, Group, MultiSelect, SimpleGrid, Stack, Table, Text, TextInput } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetEmployees } from "../../hooks/api";
import { useMemo, useState } from "react";
import { GetEmployeesResponse } from "@repo/schemas/rest";
import { DatePickerInput } from "@mantine/dates";

const EmployeeTab = () => {
  const [hireDateFilter, setHireDateFilter] = useState<[Date | null, Date | null]>([null, null]);
  const [roles, setRoles] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const { data } = useGetEmployees();

  const employees = useMemo(() => {
    return data?.employees ?? [];
  }, [data?.employees]);

  const columnHelper = createColumnHelper<GetEmployeesResponse["employees"][number]>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("firstName", {
        header: "First Name",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("lastName", {
        header: "Last Name",
        cell: ({ getValue }) => {
          return getValue() ?? "-";
        },
      }),
      columnHelper.accessor("phoneNumber", {
        header: "Phone number",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
    ];
  }, [columnHelper]);

  const { getRowModel, getHeaderGroups } = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder m="xl">
      {/* TODO: Add border radius */}
      <Stack>
        <SimpleGrid spacing="xs" verticalSpacing="xs" cols={{ base: 1, xs: 2, md: 4 }}>
          <TextInput placeholder="Search employee by name" label="Employee" />
          <DatePickerInput
            type="range"
            label="Hire date"
            placeholder="Filter by hire date"
            value={hireDateFilter}
            onChange={setHireDateFilter}
          />
          <MultiSelect
            placeholder="Select roles"
            label="Roles"
            data={["a", "b"]}
            value={roles}
            onChange={setRoles}
          />
          <MultiSelect
            data={["a"]}
            placeholder="Select positions"
            label="Positions"
            value={positions}
            onChange={setPositions}
          />
        </SimpleGrid>
        <Table withTableBorder highlightOnHover>
          <Table.Thead>
            {getHeaderGroups().map(({ id, headers }) => {
              return (
                <Table.Tr key={id}>
                  {headers.map(({ id: headerID, column, getContext }) => {
                    return (
                      <Table.Th
                        key={headerID}
                        onClick={column.getToggleSortingHandler()}
                        style={{ cursor: "pointer" }}
                      >
                        <Group wrap="nowrap">
                          <Text size="md" fw="bold">
                            {flexRender(column.columnDef.header, getContext())}
                          </Text>
                        </Group>
                      </Table.Th>
                    );
                  })}
                </Table.Tr>
              );
            })}
          </Table.Thead>
          <Table.Tbody>
            {getRowModel().rows.map(({ id, getVisibleCells }) => {
              return (
                <Table.Tr key={id}>
                  {getVisibleCells().map(({ id: dataID, column, getContext }) => {
                    return (
                      <Table.Td key={dataID}>
                        {flexRender(column.columnDef.cell, getContext())}
                      </Table.Td>
                    );
                  })}
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Stack>
    </Card>
  );
};

export default EmployeeTab;
