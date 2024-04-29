import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ThemeProvider from "../../theme/ThemeProvider";
import axios from "axios";
import EditRestaurant from "./EditRestaurant";

function RestaurantDisplay() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [restaurantToDeleteId, setRestaurantToDeleteId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [restaurant, setRestaurant] = useState({});

  const openDeleteConfirmationDialog = (id) => {
    setRestaurantToDeleteId(id);
    setOpenDeleteDialog(true);
  };
  var role = localStorage.getItem("role");
  role = role.replace(/\s/g, "");
  const confirmDelete = () => {
    console.log("Delete restaurant with id:", restaurantToDeleteId);
    axios
      .delete(
        `http://localhost:8080/api/restaurants/delete/${restaurantToDeleteId}/${role}`
      )
      .then((response) => {
        if (response.status !== 200) {
          console.error("Error updating restaurant:", response.data);
          alert("Error updating restaurant");
        } else {
          console.log("Restaurant deleted successfully:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error deleting restaurant:", error);
        if (error.response.status === 401) {
          alert("You are not allowed to delete this order");
        }
      });
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
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

  const handleEdit = (restaurant) => {
    console.log(restaurant);
    setRestaurant(restaurant);
    setOpenEditDialog(true);
  };

  const handleDelete = (id) => {
    openDeleteConfirmationDialog(id);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <ThemeProvider>
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          style={{
            padding: "30px",
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
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
            Restaurant List
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurants.map((restaurant) => (
                  <TableRow key={restaurant.id}>
                    <TableCell>{restaurant.name}</TableCell>
                    <TableCell>{restaurant.address}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(restaurant)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleDelete(restaurant.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          fullWidth
        >
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Restaurant</DialogTitle>
          <DialogContent>
            <EditRestaurant
              restaurant={restaurant}
              onClose={handleCloseEditDialog}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default RestaurantDisplay;
