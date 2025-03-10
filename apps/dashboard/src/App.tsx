import { Outlet } from "react-router";
import "@mantine/core/styles.css"; // Ref: https://mantine.dev/changelog/7-0-0/#global-styles

export function App() {
  console.log("i am in app");
  return <Outlet />;
}
