import {
  ActionIcon,
  Card,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
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
import { Client } from "@repo/schemas/rest";
import { IconEdit, IconX } from "@tabler/icons-react";
import { useGetClients } from "../../../hooks/api/client";

export interface ClientDetailsProps {
  onEdit: (client: Client) => void;
}
const ClientDetails = ({ onEdit }: ClientDetailsProps) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { data } = useGetClients();
  const { colorScheme } = useMantineColorScheme();

  const filteredClients: Client[] = useMemo(() => {
    let result: Client[] = data?.clients ?? [];

    if (searchQuery && searchQuery.length > 0) {
      result = result.filter((client) => {
        return (
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    return result;
  }, [data, searchQuery]);

  const handleResetFilter = () => {
    setSearchQuery(null);
  };

  const columnHelper = createColumnHelper<Client>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: "Email",
        cell: ({ getValue }) => {
          return getValue();
        },
      }),
      columnHelper.accessor("phoneNumber", {
        id: "phoneNumber",
        header: "Phone number",
        cell: ({ getValue }) => {
          return getValue() ?? "-";
        },
      }),
      columnHelper.accessor("address", {
        id: "address",
        header: "Address",
        cell: ({ getValue }) => {
          return getValue() ?? "-";
        },
      }),
      columnHelper.accessor("city", {
        id: "city",
        header: "City",
        cell: ({ getValue }) => {
          return getValue() ?? "-";
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

export default ClientDetails;
