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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";

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

function OrderCreation() {
  const [productName, setProductName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [currentStatus, setCurrentStatus] = useState("order received");
  const [restaurants, setRestaurants] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all existing restaurants
    axios
      .get("http://localhost:8080/api/restaurants/getAll")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setError("Error fetching restaurants");
      });
  }, []);

  const handleOrderCreation = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/orders/create", {
        productName,
        restaurantName,
        deliveryAddress,
        customerName,
        contactNumber,
        currentStatus,
      });
      setMessage("Order Created Successfully");
    } catch (error) {
      console.error("Error creating order:", error);
      setMessage("Error creating order");
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            Order Creation
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
          <form onSubmit={handleOrderCreation}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="product-name-label">Product Name</InputLabel>
              <Select
                labelId="product-name-label"
                id="product-name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                label="Product Name"
                inputProps={{ style: { borderRadius: "15px" } }}
              >
                <MenuItem value="HAMBURGER_MENU">Hamburger Menu</MenuItem>
                <MenuItem value="PIZZA_MENU">Pizza Menu</MenuItem>
                <MenuItem value="DONER_MENU">Döner Menu</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="restaurant-name-label">
                Restaurant Name
              </InputLabel>
              <Select
                labelId="restaurant-name-label"
                id="restaurant-name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                label="Restaurant Name"
                inputProps={{ style: { borderRadius: "15px" } }}
              >
                {restaurants.map((restaurant) => (
                  <MenuItem key={restaurant.id} value={restaurant.name}>
                    {restaurant.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextareaAutosize
              aria-label="Delivery Address"
              placeholder="Delivery Address"
              minRows={3}
              style={{
                width: "100%",
                borderRadius: "15px",
                marginBottom: "20px",
                padding: "10px",
              }}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
            <TextField
              label="Customer Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              InputProps={{ style: { borderRadius: "15px" } }}
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              InputProps={{ style: { borderRadius: "15px" } }}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="current-status-label">Current Status</InputLabel>
              <Select
                labelId="current-status-label"
                id="current-status"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                label="Current Status"
                inputProps={{ style: { borderRadius: "15px" } }}
              >
                <MenuItem value="order received">Order Received</MenuItem>
                <MenuItem value="prepared">Prepared</MenuItem>
                <MenuItem value="set out">Set Out</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
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
              Create Order
            </Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default OrderCreation;
