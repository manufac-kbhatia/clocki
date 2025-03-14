import { AppShell, NavLink as MantineNavLink, useMantineColorScheme } from "@mantine/core";
import { NavLink, useLocation } from "react-router";
import { Outlet } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "../../components/Header";
import { IconLayout2, IconUsersGroup } from "@tabler/icons-react";

const NavLinks = [
  {
    path: "/",
    label: "Home",
    icon: <IconLayout2 size={18} />,
  },
  {
    path: "/manage-users",
    label: "Manage users",
    icon: <IconUsersGroup size={18} />,
  },
];

export function Dashboard() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <Header
        colorScheme={colorScheme}
        onToggleColorScheme={toggleColorScheme}
        opened={opened}
        onToggleNavBaar={toggle}
      />
      <AppShell.Navbar p="md">
        {NavLinks.map(({ path, label, icon }) => {
          return (
            <MantineNavLink
              styles={{ root: { borderRadius: "10px" } }}
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
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
