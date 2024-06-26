import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Layout from "../Layout/Layout";
import RestaurantCreation from "../Restaurant/RestaurantCreation";
import OrderCreation from "../Order/OrderCreation";
import RestaurantDisplay from "../Restaurant/RestaurantDisplay";
import OrderDisplay from "../Order/OrderDisplay";
import EditOrder from "../Order/EditOrder";
import NotFoundPage from "../Error/NotFoundPage";

function App() {
  const userRole = localStorage.getItem("role");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/createRestaurant"
          element={
            <Layout>
              <RestaurantCreation />
            </Layout>
          }
        />
        <Route
          path="/createOrder"
          element={
            <Layout>
              <OrderCreation />
            </Layout>
          }
        />
        <Route
          path="/displayRestaurant"
          element={
            <Layout>
              <RestaurantDisplay />
            </Layout>
          }
        />
        <Route
          path="/displayOrder"
          element={
            <Layout>
              <OrderDisplay />
            </Layout>
          }
        />
        <Route
          path="/editOrder"
          element={
            <Layout>
              <EditOrder />
            </Layout>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
