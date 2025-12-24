import { useState } from "react";
import { toast } from "react-toastify";

import api, { BASE_URL } from "../../api";

const CartItem = ({
  item,
  setCartTotal,
  cartitems,
  setCartItems,
  setNumberCartItems,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setloading] = useState(false);
  const itemData = { quantity: quantity, item_id: item.id };
  const itemID = { item_id: item.id };

  function deleteCartitem() {
    const confirmDelete = window.confirm("Do you want to delete this cartitem");

    if (confirmDelete) {
      api
        .post("delete_cartitem/", itemID)
        .then((res) => {
          console.log(res.data);
          toast.success("cartitem deleted successfully", {
            autoClose: 3000,
            pauseOnHover: false,
          });

          const filteredItems = cartitems.filter(
            (cartitem) => cartitem.id !== item.id
          );

          setCartItems(filteredItems);

          const total = filteredItems.reduce(
            (acc, curr) => acc + curr.total,
            0
          );
          setCartTotal(total);

          const number = filteredItems.reduce(
            (acc, curr) => acc + curr.quantity,
            0
          );
          setNumberCartItems(number);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Failed to delete product");
        });
    }
  }

  function updateCartItem() {
    setloading(true);
    api
      .patch("update_quantity/", itemData)
      .then((res) => {
        console.log(res.data);
        setloading(false);
        toast.success("CartItem updated sucessfully", {
          autoClose: 1500,
          pauseOnHover: false,
        });

        const updatedCartItems = cartitems.map((cartitem) =>
          cartitem.id === item.id ? res.data.data : cartitem
        );

        setCartTotal(
          updatedCartItems.reduce((acc, curr) => acc + curr.total, 0)
        );
        setNumberCartItems(
          updatedCartItems.reduce((acc, curr) => acc + curr.quantity, 0)
        );
        setCartItems(updatedCartItems);
      })
      .catch((err) => {
        console.log(err.message);
        setloading(false);
        toast.error("Failed to update cart item");
      });
  }
  return (
    <div className="col-md-12">
      {/* Cart Items */}
      <div
        className="cart-item d-flex align-items-center mb-3 p-3"
        style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
      >
        <img
          src={`${BASE_URL}${item.product.image}`}
          alt="Product Image"
          className="img-fluid"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
        <div className="ms-3 flex-grow-1">
          <h5 className="mb-1">{item.product.name}</h5>
          <p className="mb-0 text-muted">{item.product.price}</p>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="number"
            min={1}
            className="form-control me-3"
            value={quantity}
            onChange={(e) => {
              const value = Math.max(1, e.target.value);
              setQuantity(value);
            }}
            style={{ width: "70px" }}
          />
          <button
            className="btn btn-sm mx-2"
            onClick={updateCartItem}
            style={{ backgroundColor: "#4b3bcb", color: "white" }}
            disabled={loading || parseInt(quantity) === item.quantity}
          >
            {loading ? "Updating" : "Update"}
          </button>

          <button className="btn btn-danger btn-sm" onClick={deleteCartitem}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
