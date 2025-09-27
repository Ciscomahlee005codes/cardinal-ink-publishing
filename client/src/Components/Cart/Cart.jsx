import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, books_store, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const [isProceeding, setIsProceeding] = useState(false);

  const handleClick = () => {
    setIsProceeding(true);

    setTimeout(() => {
      navigate("/getbook");
    }, 2000);
  };

  const isCartEmpty = getTotalCartAmount() === 0;

  return (
    <div className="cart">
      <h1 className="cart-title">🛒 Your Cart</h1>

      {isCartEmpty ? (
        <div className="empty-cart">
          <p>Your cart is empty 😢</p>
          <button className="shop-btn" onClick={() => navigate("/bookstore")}>
            Browse Books
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
  <div className="cart-items-header">
    <p>Item</p>
    <p>Title</p>
    <p>Author</p>
    <p>Price</p>
    <p>Remove</p>
  </div>
  <hr />

  {books_store.map((item) => {
    if (cartItems[item.id] > 0) {
      return (
        <div key={item.id}>
          <div className="cart-items-row">
            <img src={item.image} alt={item.name} />
            <p className="cart-label"><b>Title:</b> {item.title || item.name}</p>
            <p className="cart-label"><b>Author:</b> {item.author || "Unknown"}</p>
            <p className="cart-label"><b>Price:</b> ${item.price}</p>
            <IoMdClose
              onClick={() => removeFromCart(item.id)}
              className="remove-icon"
            />
          </div>
          <hr />
        </div>
      );
    }
    return null;
  })}
</div>


          {/* Cart Totals Section */}
          <div className="cart-summary">
            <h2>Cart Totals</h2>
            <div className="summary-row total">
              <b>Total</b>
              <b>${getTotalCartAmount()}</b>
            </div>

            <button
              onClick={handleClick}
              className={`checkout-button ${isProceeding ? "proceeding" : ""}`}
              disabled={isProceeding}
            >
              {isProceeding ? "PROCEEDING..." : "PROCEED TO CHECKOUT"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
