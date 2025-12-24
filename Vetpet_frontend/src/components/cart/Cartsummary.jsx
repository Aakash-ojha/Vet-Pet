import { Link } from "react-router-dom";

const CartSummary = ({ cartTotal, tax }) => {
  const sumTotal = Number(cartTotal).toFixed(2);

  // Calculate cartTax based on sumTotal
  const cartTax = (Number(sumTotal) * 0.13).toFixed(2);

  // Calculate total including tax
  const total = (Number(sumTotal) + Number(cartTax)).toFixed(2);
  return (
    <div className="col-md-4 align-self-start">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Cart Summary</h5>
          <hr />
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>{`Rs ${sumTotal}`}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Tax:</span>
            <span>{`Rs ${cartTax}`}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Total:</span>
            <strong>Rs {total}</strong>
          </div>
          <Link to="/checkout">
            <button
              className="btn btn-primary w-100"
              style={{ backgroundColor: "#6050DC", borderColor: "#6050DC" }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartSummary;
