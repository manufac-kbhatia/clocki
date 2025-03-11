import { Outlet } from "react-router";
import "@mantine/core/styles.css"; // Ref: https://mantine.dev/changelog/7-0-0/#global-styles
import "@mantine/notifications/styles.css";

export function App() {
  return <Outlet />;
}
