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
  const [name, setName] = useState(restaurant?.name || "");
  const [address, setAddress] = useState(restaurant?.address || "");
  const [manager, setManager] = useState(restaurant?.manager || {});
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

  const handleSave = () => {
    axios
      .put(`http://localhost:8080/api/restaurants/update/${restaurant.id}`, {
        name,
        address,
        managerId: +manager.id,
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
    <>
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
        {/* <InputLabel>{manager.username}</InputLabel> */}
        <Select value={manager} onChange={(e) => setManager(e.target.value)}>
          <MenuItem key={manager.id} value={manager}>
            {manager.username}
          </MenuItem>
          {managers
            .filter((eachManager) => manager.id !== eachManager.id)
            .map((eachManager) => (
              <MenuItem key={eachManager.id} value={eachManager}>
                {eachManager.username}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </>
  );
}

export default EditRestaurant;
