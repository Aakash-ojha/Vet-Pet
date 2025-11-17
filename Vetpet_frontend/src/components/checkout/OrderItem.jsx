import React from "react";
import { BASE_URL } from "../../api";

const OrderItem = ({ cartitem }) => {
  if (!cartitem || !cartitem.product) return null;

  const { product } = cartitem;

  return (
    <div
      className="d-flex justify-content-between align-items-center mb-3 p-2"
      style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
    >
      <div className="d-flex align-items-center">
        <img
          src={`${BASE_URL}${cartitem.product.image}`}
          alt={product.name || "product"}
          className="img-fluid"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
        <div className="ms-3">
          <h6 className="mb-0">{product.name}</h6>
          <small>Quantity: {cartitem.quantity || 1}</small>
        </div>
      </div>
      <h6>{`Rs ${cartitem.product.price}`}</h6>
    </div>
  );
};

export default OrderItem;
