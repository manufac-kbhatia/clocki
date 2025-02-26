import { Stack, Title, Anchor } from "@mantine/core";
import { NavLink } from "react-router";

export function ErrorPage() {
  return (
    <Stack align="center">
      <Title order={5}>Sorry this page is not available!</Title>
      <Title order={5}>
        The link you have used maybe broken or page has been removed. Go back to{" "}
        <Anchor to="/" component={NavLink}>
          Home Page
        </Anchor>
      </Title>
    </Stack>
  );
}
