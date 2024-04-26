import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const EditOrder = ({ order, onClose }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });

  const handleFieldChange = (field, value) => {
    setEditedOrder((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `http://localhost:8080/api/orders/update/${editedOrder.id}`,
        editedOrder
      )
      .then((response) => {
        console.log("Order updated successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent>
        <Select
          label="Product Name"
          value={editedOrder.productName}
          onChange={(e) => handleFieldChange("productName", e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="HAMBURGER_MENU">Hamburger Menu</MenuItem>
          <MenuItem value="PIZZA_MENU">Pizza Menu</MenuItem>
          <MenuItem value="DONER_MENU">Rotary Menu</MenuItem>
        </Select>

        <TextField
          label="Delivery Address"
          value={editedOrder.deliveryAddress}
          onChange={(e) => handleFieldChange("deliveryAddress", e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Customer Name"
          value={editedOrder.customerName}
          onChange={(e) => handleFieldChange("customerName", e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Contact Number"
          value={editedOrder.contactNumber}
          onChange={(e) => handleFieldChange("contactNumber", e.target.value)}
          fullWidth
          margin="normal"
        />

        <Select
          label="Order Status"
          value={editedOrder.orderStatus}
          onChange={(e) => handleFieldChange("orderStatus", e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="ORDER_RECEIVED">Order Received</MenuItem>
          <MenuItem value="PREPARED">Prepared</MenuItem>
          <MenuItem value="SET_OUT">Set Out</MenuItem>
          <MenuItem value="DELIVERED">Delivered</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveEdit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrder;
