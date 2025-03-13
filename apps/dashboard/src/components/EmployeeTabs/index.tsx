import {
  Button,
  Card,
  Group,
  MultiSelect,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Transition,
} from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetEmployees } from "../../hooks/api";
import { useMemo, useState } from "react";
import { EmployeeWithEmployeeInfo } from "@repo/schemas/rest";
import { DatePickerInput } from "@mantine/dates";

const EmployeeTab = () => {
  const [hireDateFilter, setHireDateFilter] = useState<[Date | null, Date | null]>([null, null]);
  const [roles, setRoles] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [showFilter, toggleFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { data } = useGetEmployees();

  const filteredEmployees: EmployeeWithEmployeeInfo[] = useMemo(() => {
    let result: EmployeeWithEmployeeInfo[] = data?.employees ?? [];
    if (
      hireDateFilter[0] === null &&
      hireDateFilter[1] === null &&
      roles.length === 0 &&
      positions.length === 0 &&
      searchQuery === null
    ) {
      return result;
    }
    const startDate = hireDateFilter[0];
    const endDate = hireDateFilter[1];
    if (startDate !== null && endDate !== null) {
      result = result.filter((employee) => {
        const hireDate = employee.employeeInfo?.hireDate;
        return hireDate && hireDate >= startDate && hireDate <= endDate;
      });
    }

    if (searchQuery && searchQuery.length > 0) {
      result = result.filter((employee) => {
        return (
          employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          employee.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    if (positions.length > 0) {
      result = result.filter((employee) => {
        const position = employee.employeeInfo?.position;
        return position && positions.includes(position);
      });
    }

    if (roles.length > 0) {
      result = result.filter((employee) => {
        const role = employee.role;
        return positions.includes(role);
      });
    }

    return result;
  }, [data, hireDateFilter, positions, roles, searchQuery]);

  const handleResetFilter = () => {
    setSearchQuery(null);
    setHireDateFilter([null, null]);
    setRoles([]);
    setPositions([]);
  };

  const columnHelper = createColumnHelper<EmployeeWithEmployeeInfo>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("firstName", {
        id: "firstName",
        header: "First Name",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("lastName", {
        id: "lastName",
        header: "Last Name",
        cell: ({ getValue }) => {
          return getValue() ?? "-";
        },
      }),
      columnHelper.accessor("phoneNumber", {
        id: "phoneNumber",
        header: "Phone number",
        cell: ({ getValue }) => {
          return getValue() ?? "-";
        },
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: "Email",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("employeeInfo", {
        id: "position",
        header: "Position",
        cell: ({ getValue }) => {
          return getValue()?.position ?? "-";
        },
      }),
      columnHelper.accessor("employeeInfo", {
        id: "hireDate",
        header: "Hire Date",
        cell: ({ getValue }) => {
          return getValue()?.hireDate ?? "-";
        },
      }),
    ];
  }, [columnHelper]);

  const { getRowModel, getHeaderGroups } = useReactTable({
    data: filteredEmployees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder m="xs">
      <Stack>
        <Group justify="space-between">
          <Title>Users</Title>
          <Group gap={5}>
            <Button variant="light" onClick={handleResetFilter}>
              Clear
            </Button>
            <Button onClick={() => toggleFilter(!showFilter)}>Filter</Button>
          </Group>
        </Group>
        <Transition
          mounted={showFilter}
          transition="pop"
          duration={50}
          timingFunction="ease-in-out"
          keepMounted
        >
          {(transitionStyle) => (
            <SimpleGrid
              spacing="xs"
              verticalSpacing="xs"
              cols={{ base: 1, xs: 2, md: 4 }}
              style={{ ...transitionStyle }}
            >
              <TextInput
                placeholder="Search"
                label="Employee"
                value={searchQuery ?? ""}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
              />
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
          )}
        </Transition>
        <Paper withBorder>
          {" "}
          {/* Ref https://github.com/orgs/mantinedev/discussions/5398 */}
          <Table highlightOnHover>
            <Table.Thead>
              {getHeaderGroups().map(({ id, headers }) => {
                return (
                  <Table.Tr key={id}>
                    {headers.map(({ id: headerID, column, getContext }) => {
                      return (
                        <Table.Th key={headerID} onClick={column.getToggleSortingHandler()}>
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
        </Paper>
      </Stack>
    </Card>
  );
};

export default EmployeeTab;
