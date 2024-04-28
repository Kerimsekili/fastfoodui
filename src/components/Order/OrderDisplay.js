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
import EditOrder from "./EditOrder";

const productNameMap = {
  HAMBURGER_MENU: "Hamburger Menu",
  PIZZA_MENU: "Pizza Menu",
  DONER_MENU: "Döner Menu",
};

const orderStatusMap = {
  ORDER_RECEIVED: "Order Received",
  PREPARED: "Prepared",
  SET_OUT: "Set Out",
  DELIVERED: "Delivered",
};

function OrderViewScreen() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedOrder, setEditedOrder] = useState({});
  const [orderToDeleteId, setOrderToDeleteId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders/getAll")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders");
      });
  }, []);

  const openDeleteConfirmationDialog = (id) => {
    setOrderToDeleteId(id);
    setOpenDeleteDialog(true);
  };
  const handleDelete = (id) => {
    setOpenDeleteDialog(false);
    axios
      .delete(`http://localhost:8080/api/orders/delete/${id}`)
      .then((response) => {
        console.log("Order deleted successfully");
        setOrders(orders.filter((order) => order.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        setError("Error deleting order");
      });
  };

  const handleEdit = (order) => {
    setOpenEditDialog(true);
    setEditedOrder(order);
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
            Order List
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
                  <TableCell>Product Name</TableCell>
                  <TableCell>Delivery Address</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {productNameMap[order.productName] || order.productName}
                    </TableCell>
                    <TableCell>{order.deliveryAddress}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.contactNumber}</TableCell>
                    <TableCell>
                      {orderStatusMap[order.orderStatus] || order.orderStatus}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(order)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => openDeleteConfirmationDialog(order.id)}
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
      </Container>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this order?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDelete(orderToDeleteId)}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          <EditOrder order={editedOrder} onClose={handleCloseEditDialog} />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default OrderViewScreen;
