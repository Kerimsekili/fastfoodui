import React, { useState, useEffect } from "react";
import {
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  TextareaAutosize,
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
      })
      .catch((error) => {
        console.error("Error fetching restaurant managers:", error);
        setError("Error fetching restaurant managers");
      });
  }, [open]);

  var role = localStorage.getItem("role");
  role = role.replace(/\s/g, "");
  const handleSave = () => {
    axios
      .put(
        `http://localhost:8080/api/restaurants/update/${restaurant.id}/${role}`,
        {
          name,
          address,
          managerId: +manager.id,
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          console.error("Error updating restaurant:", response.data);
          alert("Error updating restaurant");
        } else {
          console.log("Restaurant updated successfully:", response.data);
          window.location.reload();
          onClose();
        }
      })
      .catch((error) => {
        console.error("Error updating restaurant:", error);
        if (error.response.status === 401) {
          alert("You are not allowed to update this restaurant");
        }
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
