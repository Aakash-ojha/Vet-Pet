import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./Cartsummary";
import { Link } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useCartData from "../../hooks/useCartData";

const CartPage = ({ setNumberCartItems }) => {
  const { cartitem, setCartItems, cartTotal, setCartTotal, loading, tax } =
    useCartData();

  if (loading) return <Spinner loading={loading} />;

  if (cartitem.length < 1) {
    return (
      <div className="container my-5 py-5 text-center">
        <h4>Your cart is empty 🛒</h4>
        <p className="text-muted">You haven't added any items yet.</p>
        <Link to="/shop" className="btn btn-info mt-3 rounded-pill">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      className="container my-3 py-3"
      style={{ height: "80vh", overflowY: "auto" }}
    >
      <h5 className="mb-4">Shopping Cart</h5>
      <div className="row">
        <div className="col-md-8">
          {cartitem.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              setCartTotal={setCartTotal}
              cartitems={cartitem} // lowercase everywhere
              setNumberCartItems={setNumberCartItems}
              setCartItems={setCartItems}
            />
          ))}
        </div>
        <CartSummary cartTotal={cartTotal} tax={tax} />
      </div>
    </div>
  );
};

export default CartPage;
