import React from "react";
import OrderItem from "./OrderItem";
import styles from "./OrderSummary.module.css";

const OrderSummary = ({ cartitems = [], cartTotal = 0, tax = 0 }) => {
  // Better calculation with proper number handling
  const subtotal = Number(cartTotal).toFixed(2);
  const taxAmount = Number(subtotal * 0.13);
  const total = Number(cartTotal) + Number(taxAmount);

  // Check if cart is empty
  const isCartEmpty = cartitems.length === 0;

  return (
    <div className="col-md-8">
      <div className={`card mb-4 ${styles.card || ""}`}>
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "#6058DC", color: "white" }}
        >
          <h5 className="mb-0">Cart Summary</h5>
          <small className="badge bg-light text-dark">
            {cartitems.length} {cartitems.length === 1 ? "item" : "items"}
          </small>
        </div>

        <div className="card-body">
          {/* Cart Items Section */}
          <div
            className={`px-3 mb-3 ${styles.customScroll}`}
            style={{
              height: "300px",
              overflow: "auto",
              border: isCartEmpty ? "none" : "1px solid #e9ecef",
              borderRadius: "5px",
              backgroundColor: isCartEmpty ? "transparent" : "#f8f9fa",
            }}
          >
            {isCartEmpty ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                <i
                  className="fas fa-shopping-cart fa-3x mb-3"
                  style={{ opacity: 0.3 }}
                ></i>
                <p className="mb-0">Your cart is empty</p>
                <small>Add some items to see them here</small>
              </div>
            ) : (
              cartitems.map((cartitem) => (
                <OrderItem key={cartitem.id} cartitem={cartitem} />
              ))
            )}
          </div>

          {/* Price Breakdown */}
          {!isCartEmpty && (
            <>
              <hr className="my-3" />

              <div className="price-breakdown">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal:</span>
                  <span>Rs {subtotal}</span>
                </div>

                {Number(tax) > 0 && (
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tax:</span>
                    <span>Rs {taxAmount}</span>
                  </div>
                )}

                <hr className="my-2" />

                <div className="d-flex justify-content-between">
                  <h6 className="mb-0 fw-bold">Total:</h6>
                  <h6 className="mb-0 fw-bold text-primary">Rs {total}</h6>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
