import { createTheme, rem } from "@mantine/core";

export const MantineTheme = createTheme({
  fontSmoothing: true,
  fontFamily: "Red Hat Display, sans-serif",
  // primaryColor: "dark",
  // colors: {
  //   dark: [
  //     "#f0f1f5", // Lightest (100)
  //     "#d9dbe5", // 200
  //     "#b4b8c7", // 300
  //     "#8d91a7", // 400
  //     "#666a88", // 500
  //     "#666a88",
  //     "#212B36", // 700 (Primary shage)
  //     "#3c4a59", // 800 (Primay shade when hover)
  //     "#0e101d", // 900
  //     "#090a14", // Darkest (1000)
  //   ],
  // },
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
