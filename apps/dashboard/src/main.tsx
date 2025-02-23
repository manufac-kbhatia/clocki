import { Routers } from "./routes";
import { MantineProvider, createTheme } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "./context";

const queryClient = new QueryClient();

const MantineTheme = createTheme({
  // fontFamily: "Space Grotesk, sans-serif",
});

// Ref: https://mantine.dev/theming/theme-object/#store-theme-override-object-in-a-variable

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <MantineProvider theme={MantineTheme}>
          <RouterProvider router={Routers} />
        </MantineProvider>
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
