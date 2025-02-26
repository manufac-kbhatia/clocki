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
  primaryColor: "dark",
  colors: {
    dark: [
      "#f0f1f5", // Lightest (100)
      "#d9dbe5", // 200
      "#b4b8c7", // 300
      "#8d91a7", // 400
      "#666a88", // 500
      "#666a88", // Main shade (600)
      "#1d2031", // 700
      "#131624", // 800
      "#0e101d", // 900
      "#090a14", // Darkest (1000)
    ],
  },
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
  </StrictMode>,
);
