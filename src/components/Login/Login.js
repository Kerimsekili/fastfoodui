import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const theme = createTheme({
  typography: {
    fontFamily: ["Public Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#000000", // Black color for primary elements
    },
    secondary: {
      main: "#666666", // Grey color for secondary elements
    },
  },
});

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(""); // State to store user's role
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          username,
          password,
        }
      );
      console.log("Login successful:", response.data);
      setMessage("Login successful!");
      const userRole = response.data.role; // Get user's role from response
      setRole(userRole); // Set user's role in state
      // Redirect to home page or appropriate page based on role
      switch (userRole) {
        case "CUSTOMER":
          navigate("/customer-dashboard");
          break;
        case "RESTAURANT_MANAGER":
          navigate("/restaurant-manager-dashboard");
          break;
        case "GENERAL_MANAGER":
          navigate("/general-manager-dashboard");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("Incorrect Username or Password");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "60px",
            borderRadius: "30px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#000000",
            }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="body2"
            style={{
              textAlign: "center",
              color: "#666666",
              marginBottom: "40px",
            }}
          >
            Please log in to continue
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{ style: { borderRadius: "15px" } }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ style: { borderRadius: "15px" } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                borderRadius: "15px",
                marginTop: "30px",
                backgroundColor: "#000000",
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
        />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
