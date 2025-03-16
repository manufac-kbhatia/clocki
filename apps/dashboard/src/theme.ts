import { createTheme, rem, Table } from "@mantine/core";

export const MantineTheme = createTheme({
  fontSmoothing: true,
  fontFamily: "Red Hat Display, sans-serif",
  // primaryColor: "dark",
  colors: {
    dark: [
      "#C9C9C9", // 0 - Lightest gray (Text color)
      "#b8b8b8", // 1
      "#828282", // 2
      "#696969", // 3
      "#424242", // 4 - Card border, separator
      "#3b3b3b", // 5 - Button background
      "#2e2e2e", // 6 - Card background
      "#121212", // 7 - Primary background (updated to match screenshot)
      "#1f1f1f", // 8
      "#141414", // 9 - Darkest background
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
    Table: Table.extend({
      styles: (theme) => ({
        table: {
          backgroundColor: theme.colors.dark[6], // Background color of table
          color: theme.colors.dark[0], // Text color in table
        },
      }),
    }),
    // TextInput: TextInput.extend({
    //   styles: {
    //     input: {
    //       padding: "25px",
    //       borderColor: "#E8ECEE",
    //     },
    //   },
    // }),
    // PasswordInput: PasswordInput.extend({
    //   styles: {
    //     input: {
    //       padding: "25px",
    //       borderColor: "#E8ECEE",
    //     },
    //   },
    // }),
    // Select: Select.extend({
    //   styles: {
    //     input: {
    //       padding: "25px",
    //       borderColor: "#E8ECEE",
    //     },
    //   },
    // }),
    // DateInput: DateInput.extend({
    //   styles: {
    //     input: {
    //       padding: "25px",
    //       borderColor: "#E8ECEE",
    //     },
    //   },
    // }),
    // NumberInput: NumberInput.extend({
    //   styles: {
    //     input: {
    //       padding: "25px",
    //       borderColor: "#E8ECEE",
    //     },
    //   },
    // }),
    // MultiSelect: MultiSelect.extend({
    //   styles: {
    //     input: {
    //       padding: "25px",
    //       borderColor: "#E8ECEE",
    //     },
    //   },
    // }),
    // DatePickerInput: DatePickerInput.extend({
    //   styles: {
    //     input: {
    //       padding: "25px",
    //       borderColor: "#E8ECEE",
    //     },
    //   },
    // }),
  },
});
