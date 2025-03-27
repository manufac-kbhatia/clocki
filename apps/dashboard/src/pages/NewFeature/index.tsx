import { Title, Center, Stack } from "@mantine/core";

export function NewFeature() {
  return (
    <Center h="70vh">
      <Stack>
        <Title ta="center" order={6}>
           Feature under development
        </Title>
        <Title order={3} ta="center">
            We're working on this amazing new features to enhance your experience. Stay tuned for updates!
        </Title>
      </Stack>
    </Center>
  );
}
