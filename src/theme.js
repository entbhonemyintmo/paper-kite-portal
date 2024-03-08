import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    // use for mui components like Button and input
    primary: {
      main: "#A5E887",
      light: "#00BFFF",
    },
    // use for typo color and line
    secondary: {
      main: "#B6BAF2",
      light: "#333333",
      dark: "#FFD700",
    },
  },
});
