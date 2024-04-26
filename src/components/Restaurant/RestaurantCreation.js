import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ThemeProvider from "../../theme/ThemeProvider";
import axios from "axios";

function RestaurantCreation() {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [managers, setManagers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/managers")
      .then((response) => {
        setManagers(response.data);
        console.log("Managers:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant managers:", error);
        setError("Error fetching restaurant managers");
      });
  }, []);

  const handleRestaurantCreation = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/restaurants/create", {
        name: restaurantName,
        address: restaurantAddress,
        managerId: selectedManagerId,
      });
      setMessage("Restaurant Created Successfully");
    } catch (error) {
      console.error("Error creating restaurant:", error);
      setMessage("Error creating restaurant");
    }
  };

  return (
    <ThemeProvider>
      <Container maxWidth="md">
        <Paper
          elevation={3}
          style={{
            padding: "60px",
            borderRadius: "30px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
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
            Restaurant Creation
          </Typography>
          {error && (
            <Typography
              variant="body1"
              color="error"
              style={{ marginBottom: "20px" }}
            >
              {error}
            </Typography>
          )}
          {message && (
            <Typography variant="body1" style={{ marginBottom: "20px" }}>
              {message}
            </Typography>
          )}
          <form onSubmit={handleRestaurantCreation}>
            <TextField
              label="Restaurant Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              InputProps={{ style: { borderRadius: "15px" } }}
            />
            <TextareaAutosize
              aria-label="Restaurant Address"
              placeholder="Restaurant Address"
              minRows={3}
              style={{
                width: "100%",
                borderRadius: "15px",
                marginBottom: "20px",
                padding: "10px",
              }}
              value={restaurantAddress}
              onChange={(e) => setRestaurantAddress(e.target.value)}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="manager-select-label">
                Restaurant Manager
              </InputLabel>
              <Select
                labelId="manager-select-label"
                id="manager-select"
                value={selectedManagerId}
                onChange={(e) => setSelectedManagerId(e.target.value)}
                label="Restaurant Manager"
                inputProps={{ style: { borderRadius: "15px" } }}
              >
                {managers.map((manager) => (
                  <MenuItem key={manager} value={manager}>
                    {manager}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              Create Restaurant
            </Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default RestaurantCreation;
