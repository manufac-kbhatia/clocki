import { Routers } from "./routes";
import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "./context";
import "@fontsource/red-hat-display/300.css";
import "@fontsource/red-hat-display/400.css";
import "@fontsource/red-hat-display/500.css";
import "@fontsource/red-hat-display/600.css";
import "@fontsource/red-hat-display/700.css";
import "@fontsource/red-hat-display/800.css";
import "@fontsource/red-hat-display/900.css";
import { MantineTheme } from "./theme";
import "./index.css";
import { Notifications } from "@mantine/notifications";

const queryClient = new QueryClient();

// Ref: https://mantine.dev/theming/theme-object/#store-theme-override-object-in-a-variable

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <MantineProvider theme={MantineTheme}>
          <Notifications />
          <RouterProvider router={Routers} />
        </MantineProvider>
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
