import {
  ActionIcon,
  Avatar,
  Card,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
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
import { ProjectWithInfo } from "@repo/schemas/rest";
import { IconEdit, IconX } from "@tabler/icons-react";
import { useGetProjects } from "../../../hooks/api/project";

export interface ProjectDetailsProps {
  onEdit: (id: ProjectWithInfo) => void;
}

const ProjectDetails = ({ onEdit }: ProjectDetailsProps) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { data } = useGetProjects();
    const { colorScheme } = useMantineColorScheme();
  

  const filteredClients: ProjectWithInfo[] = useMemo(() => {
    let result: ProjectWithInfo[] = data?.projects ?? [];

    if (searchQuery && searchQuery.length > 0) {
      result = result.filter((project) => {
        return (
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.Client.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    return result;
  }, [data, searchQuery]);

  const handleResetFilter = () => {
    setSearchQuery(null);
  };

  const columnHelper = createColumnHelper<ProjectWithInfo>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("name", {
        id: "project",
        header: "Project",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("Client", {
        id: "client",
        header: "Client",
        cell: ({ getValue }) => {
          return getValue().name;
        },
      }),
      columnHelper.display({
        id: "members",
        header: "Members",
        cell: ({ row }) => {
          return (
            <Avatar.Group>
              {row.original.members.map((member) => {
                const name = `${member.firstName} ${member.lastName ?? ""}`;
                return (
                  <Tooltip label={name}>
                    <Avatar variant="filled" color="initials" name={name} />
                  </Tooltip>
                );
              })}
            </Avatar.Group>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <ActionIcon size="md" variant="default" onClick={() => onEdit(row.original)}>
              <IconEdit size={16} />
            </ActionIcon>
          );
        },
      }),
    ];
  }, [columnHelper, onEdit]);

  const { getRowModel, getHeaderGroups } = useReactTable({
    data: filteredClients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card shadow="none" padding="xl" radius="md" withBorder m="xs">
      <Stack>
        <Title>Clients</Title>
        <TextInput
          maw={300}
          placeholder="Search"
          value={searchQuery ?? ""}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          rightSection={
            searchQuery !== null ? (
              <ActionIcon size="sm" variant="light" onClick={handleResetFilter}>
                <IconX size={16} />
              </ActionIcon>
            ) : null
          }
        />
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
      </Stack>
    </Card>
  );
};

export default ProjectDetails;
