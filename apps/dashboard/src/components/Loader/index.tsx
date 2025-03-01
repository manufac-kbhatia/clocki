import { Image, LoadingOverlay } from "@mantine/core";
import loader from "../../assets/clock.gif";

export function Loader({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <LoadingOverlay
      visible={isVisible}
      zIndex={1000}
      loaderProps={{ children: <Image w={80} src={loader} /> }}
      overlayProps={{ radius: "sm", blur: 2 }}
    />
  );
}
