import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, bookCollection, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const [isProceeding, setIsProceeding] = useState(false);

  const handleClick = () => {
    setIsProceeding(true);
    setTimeout(() => {
      navigate("/getbook");
    }, 2000);
  };

  const isCartEmpty = Object.keys(cartItems).length === 0;

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
              <p>Cover</p>
              <p>Title</p>
              <p>Author</p>
              <p>Price</p>
              <p>Remove</p>
            </div>
            <hr />

            {bookCollection.map((book) => {
              if (cartItems[book.id] > 0) {
                return (
                  <div key={book.id}>
                    <div className="cart-items-row">
                      <img
                        src={`http://localhost:3000/${book.cover_url}`}
                        alt={book.title}
                      />
                      <p className="cart-label">
                        <b>Title:</b> {book.title}
                      </p>
                      <p className="cart-label">
                        <b>Author:</b> {book.author}
                      </p>
                      <p className="cart-label">
                        <b>Price:</b> ${book.price}
                      </p>
                      <IoMdClose
                        onClick={() => removeFromCart(book.id)}
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

          <div className="cart-summary">
            <h2>Cart Totals</h2>
            <div className="summary-row total">
              <b>Total</b>
              <b>${getTotalCartAmount().toFixed(2)}</b>
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
