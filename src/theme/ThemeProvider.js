import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

const createCustomTheme = (primaryColor, secondaryColor, fontFamily) => {
  return createTheme({
    typography: {
      fontFamily: fontFamily,
    },
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
    },
  });
};

const ThemeProvider = ({ children }) => {
  const theme = createCustomTheme(
    "#000000",
    "#666666",
    "Public Sans, sans-serif"
  );
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
