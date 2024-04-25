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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: ["Public Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#666666",
    },
  },
});

function RestaurantDisplay() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [restaurantToDeleteId, setRestaurantToDeleteId] = useState(null);

  const openDeleteConfirmationDialog = (id) => {
    setRestaurantToDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    console.log("Delete restaurant with id:", restaurantToDeleteId);
    axios
      .delete(
        `http://localhost:8080/api/restaurants/delete/${restaurantToDeleteId}`
      )
      .then((response) => {
        console.log("Restaurant deleted successfully");
        setRestaurants(
          restaurants.filter(
            (restaurant) => restaurant.id !== restaurantToDeleteId
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting restaurant:", error);
        setError("Error deleting restaurant");
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

  const handleEdit = (id) => {
    console.log("Edit restaurant with id:", id);
  };

  const handleDelete = (id) => {
    openDeleteConfirmationDialog(id);
  };

  return (
    <ThemeProvider theme={theme}>
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
                        onClick={() => handleEdit(restaurant.id)}
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
      </Container>
    </ThemeProvider>
  );
}

export default RestaurantDisplay;
