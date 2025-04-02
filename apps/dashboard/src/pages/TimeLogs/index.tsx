import {
  Button,
  Card,
  Group,
  ScrollArea,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Transition,
  useMantineColorScheme,
} from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { TimeEntryWithInfo } from "@repo/schemas/rest";
import { DatePickerInput } from "@mantine/dates";
import { Status } from "@repo/schemas";
import { useGetTimeEntries } from "../../hooks/api/timeSheet";
import { convertToTime } from "../../components/TimeSheet/TimeEntryModal/utils";

const TimeLogs = () => {
  const [entryDate, setEntryDate] = useState<[Date | null, Date | null]>([null, null]);
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);
  const [showFilter, toggleFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { data, isLoading } = useGetTimeEntries();
  const { colorScheme } = useMantineColorScheme();

  const filteredEntries: TimeEntryWithInfo[] = useMemo(() => {
    let result: TimeEntryWithInfo[] = data?.timeEntry ?? [];
    if (
      entryDate[0] === null &&
      entryDate[1] === null &&
      searchQuery === null &&
      statusFilter === null
    ) {
      return result;
    }
    const startDate = entryDate[0]?.toISOString().split("T")[0] as string;
    const endDate = entryDate[1]?.toISOString().split("T")[0] as string;
    if (startDate !== null && endDate !== null) {
      result = result.filter((entry) => {
        const createdAt = entry.createdAt;
        return createdAt && createdAt >= startDate && createdAt <= endDate;
      });
    }

    if (searchQuery && searchQuery.length > 0) {
      result = result.filter((entry) => {
        return (
          entry.project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    if (statusFilter) {
      result = result.filter((entry) => {
        return entry.status === statusFilter;
      });
    }

    return result;
  }, [data, entryDate, searchQuery, statusFilter]);

  const handleResetFilter = () => {
    setSearchQuery(null);
    setEntryDate([null, null]);
    setStatusFilter(null);
  };

  const columnHelper = createColumnHelper<TimeEntryWithInfo>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("project.name", {
        id: "project.name",
        header: "Project",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("employee", {
        id: "employee.name",
        header: "User",
        cell: ({ getValue }) => {
          return `${getValue().firstName} ${getValue().lastName ?? ""}`;
        },
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: "Description",
        cell: ({ getValue }) => {
          return getValue() ?? "-";
        },
      }),
      columnHelper.accessor("loggedHours", {
        id: "status",
        header: "Logged hours",
        cell: ({ getValue }) => {
          return convertToTime(getValue()) ?? "-";
        },
      }),
      columnHelper.accessor("createdAt", {
        id: "createdAt",
        header: "Logged At",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("status", {
        id: "project.id",
        header: "Status",
        cell: ({ getValue }) => {
          return getValue() ?? "-";
        },
      }),
    ];
  }, [columnHelper]);

  const { getRowModel, getHeaderGroups } = useReactTable({
    data: filteredEntries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card shadow="none" padding="xl" radius="md" withBorder m="xs">
      <Stack>
        <Group justify="space-between">
          <Title>Time Logs</Title>
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
                label="Entry date"
                placeholder="Filter by entry date"
                value={entryDate}
                onChange={setEntryDate}
              />
              <Select
                placeholder="Select roles"
                label="Roles"
                data={Object.values(Status)}
                value={statusFilter}
                onChange={(value) => setStatusFilter(value as Status)}
              />
            </SimpleGrid>
          )}
        </Transition>
        <Skeleton visible={isLoading}>
          <ScrollArea>
            <Table highlightOnHover withTableBorder>
              <Table.Thead bg={colorScheme === "dark" ? "#383838" : "#ECECEC"}>
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
          </ScrollArea>
        </Skeleton>
      </Stack>
    </Card>
  );
};

export default TimeLogs;
