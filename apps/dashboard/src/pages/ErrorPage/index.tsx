import { Title, Anchor, Center, Stack } from "@mantine/core";
import { NavLink } from "react-router";

export function ErrorPage() {
  return (
    <Center h="100vh">
      <Stack>
        <Title ta="center" order={1}>
          Sorry this page is not available!
        </Title>
        <Title order={1}>
          The link you have used maybe broken or page has been removed. Go back to{" "}
          <Anchor to="/" component={NavLink}>
            Home Page
          </Anchor>
        </Title>
      </Stack>
    </Center>
  );
}
