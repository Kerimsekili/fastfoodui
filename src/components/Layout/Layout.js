import React from "react";
import Navbar from "../Navbar/Navbar";
import Button from "../Login/LoginButton";

function Layout({ children }) {
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/";
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
          }}
        >
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 64px)",
            marginTop: "64px",
            padding: "20px",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
