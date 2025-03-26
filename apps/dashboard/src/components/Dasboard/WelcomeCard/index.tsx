import {
  Card,
  Group,
  Pill,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconQuestionMark, IconExternalLink } from "@tabler/icons-react";

export interface WelcomeCardProps {
  userName?: string;
}
const WelcomeCard = ({ userName }: WelcomeCardProps) => {
  const theme = useMantineTheme();

  return (
    <Card withBorder shadow="none">
      <SimpleGrid cols={2}>
        <Stack>
          <Text c={theme.primaryColor} fw={400}>
            {new Date().toLocaleString("default", { dateStyle: "full" })}
          </Text>
          <Title order={2}>Hello {userName}!</Title>
          <Text size="md">
            Welcome back! Track working hours, plan projects, and manage your vacations all in one
            place!
          </Text>
        </Stack>
        <Group wrap="nowrap">
          <Card withBorder>
            <Stack>
              <ThemeIcon size="lg" radius="xl">
                <IconQuestionMark />
              </ThemeIcon>
              <Title>Usage instructions</Title>
              <Text>Need help? Find tips to use Cloki better !</Text>
            </Stack>
          </Card>
          <Card withBorder>
            <Stack align="center">
              <Pill w="fit-content" size="xl" bg={theme.primaryColor} c="white" fw={700}>
                Are you new?
              </Pill>
              <Group wrap="nowrap">
                <Stack>
                  <Title>Setting up your organisation</Title>
                  <Text>Watch video instruction</Text>
                </Stack>
                <ThemeIcon size="xl" variant="outline" radius="xl">
                  <IconExternalLink />
                </ThemeIcon>
              </Group>
            </Stack>
          </Card>
        </Group>
      </SimpleGrid>
    </Card>
  );
};

export default WelcomeCard;
