import React from "react";

function NotAllowedDevice({ visitorId }) {
  const wrapperStyle = {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "32px",
    textAlign: "center",
    maxWidth: "400px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  };

  const iconStyle = {
    fontSize: "48px",
    marginBottom: "16px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#dc2626", // red-600
    marginBottom: "8px",
  };

  const messageStyle = {
    fontSize: "16px",
    color: "#4b5563", // gray-600
  };

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={iconStyle}>🚫</div>
        <h1 style={titleStyle}>Access Denied</h1>
        <p style={messageStyle}>
          This device is not authorized to access this application.
        </p>
        <p style={messageStyle}>{visitorId}</p>
      </div>
    </div>
  );
}

export default NotAllowedDevice;
