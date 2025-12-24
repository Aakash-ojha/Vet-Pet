import React from "react";
import OrderSummary from "./OrderSummary";
import PaymentSection from "./PaymentSection";
import useCartData from "../../hooks/useCartData";

const CheckoutPage = () => {
  const { cartitem, setCartItems, cartTotal, setCartTotal, loading, tax } =
    useCartData();

  if (loading) return <div>Loading...</div>; // or use your Spinner

  return (
    <div className="container my-3">
      <div className="row">
        <OrderSummary cartitems={cartitem} cartTotal={cartTotal} tax={tax} />{" "}
        {/* lowercase everywhere */}
        <PaymentSection />
      </div>
    </div>
  );
};

export default CheckoutPage;
