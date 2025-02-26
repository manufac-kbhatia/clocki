import { AppShell, Burger, Group, Image, Skeleton, Title } from "@mantine/core";
import { Outlet } from "react-router";
import "@mantine/core/styles.css"; // Ref: https://mantine.dev/changelog/7-0-0/#global-styles
import { useDisclosure } from "@mantine/hooks";

export function App() {
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
            <Title>CL</Title>
            <Image src="/clock.svg" w={30} />
            <Title>KI</Title>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
