import { Center } from "@mantine/core";

export function Loader({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <Center h={"100vh"}>
      <Loader isVisible={isVisible} />
    </Center>
  );
}
