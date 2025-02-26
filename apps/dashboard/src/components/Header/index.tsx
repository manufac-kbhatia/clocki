import { AppShell, ActionIcon, Group, NavLink as MantineNavLink, Title } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router";
import type { MantineColorScheme } from "@mantine/core";
import type React from "react";

export interface HeaderProps {
  colorScheme: MantineColorScheme;
  onToggleColorScheme: () => void;
}

const NavLinks: { path: string; label: string }[] = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/page-a",
    label: "PageA",
  },
  {
    path: "/page-b",
    label: "PageB",
  },
  {
    path: "/broken",
    label: "Broken",
  },
];

export function Header({ colorScheme, onToggleColorScheme }: HeaderProps): React.JSX.Element {
  const location = useLocation();

  return (
    <AppShell.Header p="xs">
      <Group justify="space-between" align="center">
        <Title order={5}>Header</Title>
        <Group wrap="nowrap">
          {NavLinks.map(({ path, label }) => {
            return (
              <MantineNavLink
                key={path}
                component={NavLink}
                active={location.pathname === path}
                to={path}
                label={label}
              />
            );
          })}
        </Group>
        <ActionIcon onClick={onToggleColorScheme} variant="default">
          {colorScheme === "dark" ? <IconSun /> : <IconMoonStars />}
        </ActionIcon>
      </Group>
    </AppShell.Header>
  );
}
