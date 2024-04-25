import React from "react";
import { Link } from "react-router-dom";
import {
  RestaurantOutlined,
  ShoppingCartOutlined,
  BuildOutlined,
  ErrorOutlineOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

function Navbar({ role }) {
  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#f0f0f0",
        height: "100vh",
        position: "fixed",
        left: 0,
        paddingTop: "20px",
        borderRight: "1px solid #ccc",
        fontFamily: "'Public Sans', sans-serif",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <Link to="/createRestaurant" style={linkStyle}>
            <RestaurantOutlined style={iconStyle} /> RESTAURANT CREATION
          </Link>
        </li>
        <li>
          <Link to="/createOrder" style={linkStyle}>
            <ShoppingCartOutlined style={iconStyle} /> ORDER CREATION
          </Link>
        </li>
        {role === "GENERAL_MANAGER" && (
          <>
            <li>
              <Link to="/restaurant-fix" style={linkStyle}>
                <BuildOutlined style={iconStyle} /> RESTAURANT FIX
              </Link>
            </li>
            <li>
              <Link to="/order-correction" style={linkStyle}>
                <ErrorOutlineOutlined style={iconStyle} /> ORDER CORRECTION
              </Link>
            </li>
            <li>
              <Link to="/order-view" style={linkStyle}>
                <VisibilityOutlined style={iconStyle} /> ORDER VIEW
              </Link>
            </li>
            <li>
              <Link to="/restaurant-display" style={linkStyle}>
                <VisibilityOutlined style={iconStyle} /> RESTAURANT DISPLAY
              </Link>
            </li>
          </>
        )}
        {role === "RESTAURANT_MANAGER" && (
          <li>
            <Link to="/order-correction" style={linkStyle}>
              <ErrorOutlineOutlined style={iconStyle} /> ORDER CORRECTION
            </Link>
          </li>
        )}
        {role === "CUSTOMER" && (
          <li>
            <Link to="/order-view" style={linkStyle}>
              <VisibilityOutlined style={iconStyle} /> ORDER VIEW
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

const linkStyle = {
  color: "#000",
  textDecoration: "none",
  fontSize: "12px",
  textTransform: "uppercase",
  display: "block",
  padding: "10px 20px",
};

const iconStyle = {
  marginRight: "8px",
};

export default Navbar;
