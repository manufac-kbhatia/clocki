import { AppShell, ActionIcon, Group, Title, Burger, Image, Text } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import type { MantineColorScheme } from "@mantine/core";
import type React from "react";
import { useClockiContext } from "../../context";
import CustomAvatar from "../Avatar";

export interface HeaderProps {
  colorScheme: MantineColorScheme;
  onToggleColorScheme: () => void;
  opened: boolean;
  onToggleNavBaar: () => void;
}

export function Header({
  colorScheme,
  onToggleColorScheme,
  opened,
  onToggleNavBaar,
}: HeaderProps): React.JSX.Element {
  const { auth } = useClockiContext();

  const name = `${auth?.employee?.firstName} ${auth?.employee?.lastName}`;

  return (
    <AppShell.Header>
      <Group h="100%" px="sm">
        <Group w={{ base: "fit-content", xs: 200 }}>
          <Burger opened={opened} onClick={onToggleNavBaar} hiddenFrom="sm" size="sm" />
          <Group gap={2} visibleFrom="xs">
            <Title size="h2" ta="center">
              cl
            </Title>
            <Image src="/clock.svg" w={25} />
            <Title size="h2" ta="center">
              ki
            </Title>
          </Group>
        </Group>
        <Group flex={1} justify="space-between">
          <Title order={1}>{auth?.employee?.createdOrganisation?.name}</Title>
          <Group gap="xl">
            <Text>{new Date().toLocaleString("default", { dateStyle: "full" })}</Text>
            <Group>
              <ActionIcon size="lg" onClick={onToggleColorScheme} variant="default">
                {colorScheme === "dark" ? <IconSun /> : <IconMoonStars />}
              </ActionIcon>
              <CustomAvatar name={name} />
            </Group>
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
