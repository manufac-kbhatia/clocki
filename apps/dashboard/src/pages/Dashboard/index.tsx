import { AppShell, Burger, Group, Image, NavLink as MantineNavLink, Title } from "@mantine/core";
import { NavLink } from "react-router";
import { Outlet } from "react-router";
import { useDisclosure } from "@mantine/hooks";

const NavLinks: { path: string; label: string }[] = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/page",
    label: "PageA",
  },
];

export function Dashboard() {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group
            gap={2}
            style={{
              color: "#1d2031", // TODO: use mantine theme
            }}
          >
            <Title size="h2" ta="center">
              cl
            </Title>
            <Image src="/clock.svg" w={25} />
            <Title size="h2" ta="center">
              ki
            </Title>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
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
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
