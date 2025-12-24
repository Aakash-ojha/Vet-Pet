import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import OrderHistoryItem from "./OrderHistoryItem";

const OrderHistoryPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          color: "#6050DC",
          fontSize: "1rem",
        }}
      >
        <FiArrowLeft size={24} style={{ marginRight: "0.5rem" }} />
        Back to Profile
      </button>

      <h2>Order History (Full Page)</h2>
      <div>
        <OrderHistoryItem />
        <OrderHistoryItem />
        <OrderHistoryItem />
        <OrderHistoryItem />
        {/* You can fetch and render all orders here */}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
