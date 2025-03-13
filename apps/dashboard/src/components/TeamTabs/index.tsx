import { ActionIcon, Card, Divider, Grid, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { useGetTeams } from "../../hooks/api";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import CustomAvatar from "../Avatar";

const TeamTab = () => {
  const { data } = useGetTeams();
  return (
    <Grid m="xl">
      {data?.teams.map((team) => {
        const teamLeadName = `${team.teamLead.firstName} ${team.teamLead.lastName}`;
        return (
          <Grid.Col span={4}>
            <Card withBorder shadow="md" mih={500}>
              <Stack>
                <Group justify="space-between">
                  <Text>{team.name}</Text>
                  <Group>
                    <ActionIcon variant="white" size="xs">
                      <IconTrash />
                    </ActionIcon  >
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
                    const name = `${member.firstName} ${member.lastName}`;
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
  );
};

export default TeamTab;
