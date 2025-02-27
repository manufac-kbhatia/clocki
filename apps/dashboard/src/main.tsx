import { Routers } from "./routes";
import { MantineProvider, PasswordInput, TextInput, createTheme, rem } from "@mantine/core";
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

const queryClient = new QueryClient();

const MantineTheme = createTheme({
  fontFamily: "Red Hat Display, Space Grotesk, sans-serif",
  primaryColor: "dark",
  colors: {
    dark: [
      "#f0f1f5", // Lightest (100)
      "#d9dbe5", // 200
      "#b4b8c7", // 300
      "#8d91a7", // 400
      "#666a88", // 500
      "#666a88",
      "#212B36", // 700 (Primary shage)
      "#3c4a59", // 800 (Primay shade when hover)
      "#0e101d", // 900
      "#090a14", // Darkest (1000)
    ],
  },

  headings: {
    sizes: {
      h1: { fontSize: rem(20), fontWeight: "700" },
      h2: { fontSize: rem(30), fontWeight: "700" },
      h3: { fontSize: rem(40), fontWeight: "700" },
      h4: { fontSize: rem(50), fontWeight: "700" },
      h5: { fontSize: rem(60), fontWeight: "700" },
      h6: { fontSize: rem(60), fontWeight: "700" },
    },
  },

  defaultRadius: "md",

  components: {
    TextInput: TextInput.extend({
      styles: {
        input: {
          padding: "25px",
          borderColor: "#E8ECEE"
        }
      },
    }),
    PasswordInput: PasswordInput.extend({
      styles: {
        input: {
          padding: "25px",
          borderColor: "#E8ECEE"
        }
      },
    })
  }
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
