import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteTeam, useGetTeams } from "../../../hooks/api/team";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

const TeamsDetails = () => {
  const { data, isLoading: isGetTeamLoading } = useGetTeams();
  const queryClient = useQueryClient();
  const { mutate: deleteTeam } = useDeleteTeam({
    onSuccess: async () => {
      notifications.show({
        title: "Team deleted",
        message: "",
      });
      await queryClient.invalidateQueries({ queryKey: ["teams"] });
    },

    onError: () => {
      notifications.show({
        title: "Failed",
        message: "",
        color: "red",
      });
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [deletedTeamId, setDeleteTeamId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    setDeleteTeamId(id);
    open();
  };

  if (isGetTeamLoading)
    return (
      <ScrollArea h={650}>
        <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }} m="xs">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} visible={isGetTeamLoading} h={500} w={400} />
          ))}
        </SimpleGrid>
      </ScrollArea>
    );

  return (
    <ScrollArea h={650}>
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }} m="xs">
        {data?.teams.map((team) => {
          const teamLeadName = `${team.teamLead.firstName} ${team.teamLead.lastName ?? ""}`;
          return (
            <Card withBorder shadow="none" mih={500} radius="lg" key={team.id}>
              <Stack>
                <Group justify="space-between">
                  <Text size="lg" fw={700}>
                    {team.name}
                  </Text>
                  <Group>
                    <ActionIcon size="md" variant="default" onClick={() => handleDelete(team.id)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                    <ActionIcon
                      size="md"
                      variant="default"
                      onClick={() => navigate(`/manage-users/team/${team.id}`)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Group>
                </Group>
                <>
                  <Text fw={600}>Team Lead</Text>
                  <Card m="xs" withBorder p={5} shadow="none">
                    <Group justify="space-between">
                      <Group>
                        <Avatar color="initials" name={teamLeadName} />
                        <Stack gap={1}>
                          <Text size="sm">{teamLeadName}</Text>

                          <Text size="sm" fw={700}>
                            {team.teamLead.employeeInfo?.position ?? ""}
                          </Text>
                        </Stack>
                      </Group>
                    </Group>
                  </Card>
                </>
                <Divider />
                <>
                  <Text fw={600}>Members</Text>
                  <ScrollArea h={200} scrollbars="y">
                    {team.members.map((member) => {
                      const name = `${member.firstName} ${member.lastName ?? ""}`;
                      return (
                        <Card m="xs" withBorder p={5} shadow="none" key={member.id}>
                          <Group justify="space-between">
                            <Group>
                              <Avatar color="initials" name={name} />
                              <Stack gap={1}>
                                <Text size="sm">{name}</Text>

                                <Text size="sm" fw={700}>
                                  {member.employeeInfo?.position ?? ""}
                                </Text>
                              </Stack>
                            </Group>
                          </Group>
                        </Card>
                      );
                    })}
                  </ScrollArea>
                </>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={700}>Delete Confirmation</Text>}
        centered
        withCloseButton
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 4,
        }}
      >
        <Stack>
          <Text>This action cannot be undone.</Text>
          <Group justify="end" gap={5}>
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteTeam(deletedTeamId ?? "");
                close();
              }}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </ScrollArea>
  );
};

export default TeamsDetails;
