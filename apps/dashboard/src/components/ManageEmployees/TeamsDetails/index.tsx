import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDeleteTeam, useGetTeams } from "../../../hooks/api";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router";

const TeamsDetails = () => {
  const { data } = useGetTeams();
  const { mutate: deleteTeam } = useDeleteTeam();
  const [opened, { open, close }] = useDisclosure(false);
  const [deletedTeamId, setDeleteTeamId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    setDeleteTeamId(id);
    open();
  };

  return (
    <>
      <Grid m="xs">
        {data?.teams.map((team) => {
          const teamLeadName = `${team.teamLead.firstName} ${team.teamLead.lastName ?? ""}`;
          return (
            <Grid.Col span={4}>
              <Card withBorder shadow="md" mih={500} radius="lg">
                <Stack>
                  <Group justify="space-between">
                    <Text>{team.name}</Text>
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
                    <Text>Team Lead</Text>
                    <Card m="xs" withBorder p={5}>
                      <Group>
                        <Avatar variant="filled" radius="xl" name={teamLeadName} size="md" />

                        <Text>{teamLeadName}</Text>
                      </Group>
                    </Card>
                  </>
                  <Divider />
                  <>
                    <Text>Members</Text>
                    <ScrollArea h={200} scrollbars="y">
                      {team.members.map((member) => {
                        const name = `${member.firstName} ${member.lastName ?? ""}`;
                        return (
                          <Card m="xs" withBorder p={5}>
                            <Group>
                              <Avatar variant="filled" radius="xl" name={name} size="md" />
                              <Text>{name}</Text>
                            </Group>
                          </Card>
                        );
                      })}
                    </ScrollArea>
                  </>
                </Stack>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
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
    </>
  );
};

export default TeamsDetails;
