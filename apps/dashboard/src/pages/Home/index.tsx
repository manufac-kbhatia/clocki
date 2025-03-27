import { AppShell, Divider, NavLink as MantineNavLink, Stack, Title, useMantineColorScheme } from "@mantine/core";
import { NavLink, useLocation } from "react-router";
import { Outlet } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "../../components/Header";
import {
  IconAlarmPlus,
  IconClock2,
  IconLayout2,
  IconRobot,
  IconSettings,
  IconTools,
  IconUsersGroup,
} from "@tabler/icons-react";

const PanelNavLinks = [
  {
    path: "/",
    label: "Dashboard",
    icon: <IconLayout2 size={18} />,
  },
  {
    path: "/log-time",
    label: "Log time",
    icon: <IconAlarmPlus size={18} />,
  },
  {
    path: "/assistant",
    label: "Assistant",
    icon: <IconRobot size={18} />,
  },
];


const ManageNavLinks = [
  {
    path: "/manage-users",
    label: "Manage users",
    icon: <IconUsersGroup size={18} />,
  },
  {
    path: "/manage-projects",
    label: "Manage projects",
    icon: <IconTools size={18} />,
  },
  {
    path: "/time-logs",
    label: "Time logs",
    icon: <IconClock2 size={18} />,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: <IconSettings size={18} />,
  },
];

export function Home() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      styles={{
        header: { backgroundColor: colorScheme === "dark" ? "#1f1f1f" : "#F8F8F8" },
        navbar: { backgroundColor: colorScheme === "dark" ? "#1f1f1f" : "#F8F8F8" },
      }}
    >
      <Header
        colorScheme={colorScheme}
        onToggleColorScheme={toggleColorScheme}
        opened={opened}
        onToggleNavBaar={toggle}
      />
      <AppShell.Navbar p="md">
        <Stack gap={5}>
        <Title>Panel</Title>
          {PanelNavLinks.map(({ path, label, icon }) => {
            return (
              <MantineNavLink
                styles={{ root: { borderRadius: "5px" } }}
                fw={700}
                leftSection={icon}
                key={path}
                component={NavLink}
                active={location.pathname === path}
                to={path}
                label={label}
                variant="filled"
              />
            );
          })}
          <Divider />
          <Title>Manage</Title>
          {ManageNavLinks.map(({ path, label, icon }) => {
            return (
              <MantineNavLink
                styles={{ root: { borderRadius: "5px" } }}
                fw={700}
                leftSection={icon}
                key={path}
                component={NavLink}
                active={location.pathname === path}
                to={path}
                label={label}
                variant="filled"
              />
            );
          })}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
