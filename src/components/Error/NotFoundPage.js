import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Box from "@mui/material/Box";
import ThemeProvider from "../../theme/ThemeProvider";

const NotFoundPage = () => {
  return (
    <ThemeProvider>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main" }} />
        <Typography variant="h4" align="center" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Return to Previous Page
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default NotFoundPage;
