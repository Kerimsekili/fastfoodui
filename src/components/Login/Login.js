import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import ThemeProvider from "../../theme/ThemeProvider";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
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

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        setMessage("Login successful!");
        const userRole = response.data.role;
        localStorage.setItem("role", userRole);
        setRole(userRole);
        switch (userRole) {
          case "CUSTOMER":
            navigate("/createOrder");
            break;
          case "RESTAURANT_MANAGER":
            navigate("/displayOrder");
            break;
          case "GENERAL_MANAGER":
            navigate("/createRestaurant");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        alert("Error: 404 Not Found");
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
    <ThemeProvider>
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
