import { Stack, Grid, Divider, Avatar, Tooltip, Text } from "@mantine/core";
import { useClockiContext } from "../../../context";

const MyTeams = () => {
  const { auth } = useClockiContext();
  return (
    <Stack fw={600}>
      <Grid>
        <Grid.Col span={4}>Team</Grid.Col>
        <Grid.Col span={4}>Team Lead</Grid.Col>
        <Grid.Col span={4}>Team Members</Grid.Col>
      </Grid>
      <Divider />

      <>
        {auth?.employee?.teams && auth.employee.teams.length > 0 ? (
          auth.employee.teams.map((team) => {
            return (
              <Grid key={team.name}>
                <Grid.Col span={6}>{team.name}</Grid.Col>
                <Grid.Col span={6}>
                  {" "}
                  <Avatar
                    variant="filled"
                    color="initials"
                    name={`${team.teamLead.firstName} ${team.teamLead.lastName ?? ""}`}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  {
                    <Avatar.Group>
                      {team.members.map((member) => {
                        const name = `${member.firstName} ${member.lastName ?? ""}`;
                        return (
                          <Tooltip key={name} label={name}>
                            <Avatar variant="filled" color="initials" name={name} />
                          </Tooltip>
                        );
                      })}
                    </Avatar.Group>
                  }
                </Grid.Col>
              </Grid>
            );
          })
        ) : (
          <Text ta="center" c="dimmed">
            No teams Assigned
          </Text>
        )}
      </>
    </Stack>
  );
};

export default MyTeams;
