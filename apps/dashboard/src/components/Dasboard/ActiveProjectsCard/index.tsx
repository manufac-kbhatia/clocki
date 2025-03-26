import { Card, Stack, Group, Title, Pill, Text, useMantineTheme } from "@mantine/core";

const ActiveProjectsCard = ({ totalActiveProjects }: { totalActiveProjects: number }) => {
  const theme = useMantineTheme();
  return (
    <Card>
      <Stack>
        <Group justify="space-between">
          <Title>Active projects</Title>
          <Text size="sm">
            {new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())},{" "}
            {new Date().getFullYear()}
          </Text>
        </Group>
        <Pill w="fit-content" size="xl" bg={theme.primaryColor} c="white" fw={700}>
          {totalActiveProjects}
        </Pill>
      </Stack>
    </Card>
  );
};

export default ActiveProjectsCard;
