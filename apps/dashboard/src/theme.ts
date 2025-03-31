import { createTheme, rem } from "@mantine/core";

export const MantineTheme = createTheme({
  fontSmoothing: true,
  fontFamily: "Red Hat Display, sans-serif",
  primaryColor: "violet",
  white: "#F2F2F2",
  colors: {
    dark: [
      "#eeeeee", // 0 - Lightest gray (Text color)
      "#b8b8b8", // 1
      "#828282", // 2
      "#696969", // 3
      "#424242", // 4 - Card border, separator
      "#3b3b3b", // 5 - Button background
      "#1f1f1f", // 6 - Card background
      "#121212", // 7 - Primary background
      "#2e2e2e", // 8
      "#141414", // 9 - Darkest backgrounds
    ],
    oceanBlue: [
      "#7AD1DD",
      "#5FCCDB",
      "#99e9f2",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
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
});
