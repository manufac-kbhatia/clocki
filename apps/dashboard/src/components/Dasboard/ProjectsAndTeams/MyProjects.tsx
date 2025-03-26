import { Stack, Grid, Divider, Avatar, Tooltip, Text } from "@mantine/core";
import { useClockiContext } from "../../../context";

const MyProjects = () => {
  const { auth } = useClockiContext();
  return (
    <Stack fw={600}>
      <Grid>
        <Grid.Col span={6}>Project</Grid.Col>
        <Grid.Col span={6}>Assigness</Grid.Col>
      </Grid>
      <Divider />

      <>
        {auth?.employee?.projects && auth.employee.projects.length > 0 ? (
          auth.employee.projects.map((project) => {
            return (
              <Grid>
                <Grid.Col span={6}>{project.name}</Grid.Col>
                <Grid.Col span={6}>
                  {
                    <Avatar.Group>
                      {project.members.map((member) => {
                        const name = `${member.firstName} ${member.lastName ?? ""}`;
                        return (
                          <Tooltip label={name}>
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
            No projects assigned
          </Text>
        )}
      </>
    </Stack>
  );
};

export default MyProjects;
