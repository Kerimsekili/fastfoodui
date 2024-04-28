import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const productNameMap = {
  HAMBURGER_MENU: "Hamburger Menu",
  PIZZA_MENU: "Pizza Menu",
  DONER_MENU: "Döner Menu",
};

const orderStatusMap = [
  { id: 0, value: "Order Received" },
  { id: 1, value: "Prepared" },
  { id: 2, value: "Set Out" },
  { id: 3, value: "Delivered" },
];

function EditOrder({ order, onClose }) {
  const [fetchedOrder, setFetchedOrder] = useState({});
  const [productName, setProductName] = useState(order.productName + "");
  const [deliveryAddress, setDeliveryAddress] = useState(order.deliveryAddress);
  const [customerName, setCustomerName] = useState(order.customerName);
  const [contactNumber, setContactNumber] = useState(order.contactNumber);
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);

  const nav = useNavigate();

  useEffect(() => {}, [updated]);

  const handleSave = async () => {
    setError("");
    try {
      const updatedOrder = {
        id: order.id,
        productName,
        deliveryAddress,
        customerName,
        contactNumber,
        orderStatus,
      };
      await axios
        .put(
          `http://localhost:8080/api/orders/update/${order.id}`,
          updatedOrder
        )
        .then((response) => {
          console.log("Order updated successfully:", response.data);
          updated === true ? setUpdated(false) : setUpdated(true);
        });
      onClose(); // Close the edit dialog
      nav("/displayOrder");
    } catch (error) {
      console.error("Error updating order:", error);
      setError("Error updating order");
    }
  };

  return (
    <div>
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
      <TextField
        label="Delivery Address"
        variant="outlined"
        value={deliveryAddress}
        onChange={(event) => setDeliveryAddress(event.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Customer Name"
        variant="outlined"
        value={customerName}
        onChange={(event) => setCustomerName(event.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Number"
        variant="outlined"
        value={contactNumber}
        onChange={(event) => setContactNumber(event.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="order-status-label">Order Status</InputLabel>
        <Select
          labelId="order-status-label"
          value={orderStatus}
          onChange={(event) => setOrderStatus(event.target.value)}
        >
          {orderStatusMap.map((status) => (
            <MenuItem key={status.id} value={status.id}>
              {status.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
}

export default EditOrder;
