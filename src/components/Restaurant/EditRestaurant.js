import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Snackbar,
} from "@mui/material";
import axios from "axios";

function EditRestaurant({ open, onClose, restaurant }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [manager, setManager] = useState("");
  const [managers, setManagers] = useState([]);
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
  }, [open]);

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name);
      setAddress(restaurant.address);
      setManager(restaurant.managerId);
    }
  }, [restaurant]);

  const handleSave = () => {
    axios
      .put(`http://localhost:8080/api/restaurants/${restaurant.id}`, {
        name,
        address,
        managerId: manager,
      })
      .then((response) => {
        console.log("Restaurant updated successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating restaurant:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Restaurant</DialogTitle>
      <DialogContent>
        <TextField
          label="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextareaAutosize
          label="Restaurant Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          minRows={3}
          placeholder="Address"
          style={{ width: "100%", marginTop: "16px" }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Restaurant Manager</InputLabel>
          <Select value={manager} onChange={(e) => setManager(e.target.value)}>
            {managers.map((manager) => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditRestaurant;
