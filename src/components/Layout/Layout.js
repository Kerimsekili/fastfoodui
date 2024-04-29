import React from "react";
import Navbar from "../Navbar/Navbar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
