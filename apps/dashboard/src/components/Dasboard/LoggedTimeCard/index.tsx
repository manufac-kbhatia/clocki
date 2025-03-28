import { Card, Group, Pill, Stack, Text, Title, useMantineTheme } from "@mantine/core";

const LoggedTimeCard = ({ totalLoggedHours }: { totalLoggedHours: string }) => {
  const theme = useMantineTheme();
  return (
    <Card withBorder shadow="none">
      <Stack>
        <Group justify="space-between">
          <Title>Logged hours</Title>
          <Text size="sm">
            {new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())},{" "}
            {new Date().getFullYear()}
          </Text>
        </Group>
        <Pill w="fit-content" size="xl" bg={theme.primaryColor} c="white" fw={700}>
          {totalLoggedHours}
        </Pill>
      </Stack>
    </Card>
  );
};

export default LoggedTimeCard;
