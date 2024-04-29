import React from "react";
import { Button as MuiButton } from "@mui/material";
import ThemeProvider from "../../theme/ThemeProvider";

const Button = ({ children, ...props }) => {
  return (
    <ThemeProvider>
      <MuiButton {...props}>{children}</MuiButton>
    </ThemeProvider>
  );
};

export default Button;
