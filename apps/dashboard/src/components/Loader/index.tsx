import { Center, LoadingOverlay } from "@mantine/core";

export function Loader({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <Center h={"100vh"}>
      <LoadingOverlay visible={isVisible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
    </Center>
  );
}
