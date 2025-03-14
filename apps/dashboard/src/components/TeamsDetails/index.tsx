import {
  ActionIcon,
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
import { useDeleteTeam, useGetTeams } from "../../hooks/api";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import CustomAvatar from "../Avatar";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const TeamsDetails = () => {
  const { data } = useGetTeams();
  const { mutate: deleteTeam } = useDeleteTeam();
  const [opened, { open, close }] = useDisclosure(false);
  const [deletedTeamId, setDeleteTeamId] = useState<string | null>(null);

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
                      <ActionIcon variant="white" size="xs" onClick={() => handleDelete(team.id)}>
                        <IconTrash />
                      </ActionIcon>
                      <ActionIcon variant="white" size="xs">
                        <IconEdit />
                      </ActionIcon>
                    </Group>
                  </Group>
                  <>
                    <Text>Team Lead</Text>
                    <Card m="xs" withBorder p={5}>
                      <Group>
                        <CustomAvatar name={teamLeadName} />
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
                              <CustomAvatar name={name} />
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
