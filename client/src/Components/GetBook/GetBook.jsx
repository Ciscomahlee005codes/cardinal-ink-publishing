import React, { useContext, useState } from "react";
import "./GetBook.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const GetBook = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, setCartItems } = useContext(StoreContext);

  const [isProceeding, setIsProceeding] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Opay");

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProceeding(true);
    setTimeout(() => {
      setShowConfirmation(true);
      setIsProceeding(false);
      setCartItems({});
    }, 2000);
  };

  const handleContinue = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  return (
    <>
      <form className="place-order">
        {/* Checkout Section */}
        <div className="place-order-left">
          <p className="delivery-information">Checkout Information</p>

          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          {/* Payment */}
          <div className="payment-method">
            <label htmlFor="payment">Payment Method</label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Opay">Opay</option>
              <option value="Visa">Visa Card</option>
              <option value="Geepay">Geepay</option>
            </select>
          </div>
        </div>

        {/* Cart Total Section */}
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="card-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()}</b>
            </div>
            <div id="cart-content">
              <button
                onClick={handleClick}
                className={`checkout-button ${isProceeding ? "proceeding" : ""}`}
                disabled={isProceeding}
              >
                {isProceeding ? "PROCESSING..." : "Get Book"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Order Confirmation */}
      {showConfirmation && (
        <div className="order-confirmation-popup">
          <div className="popup-inner">
            <h2>✅ Order Successful!</h2>
            <p>
              You will receive a confirmation email shortly. Thank you for shopping
              with us.
            </p>
            <button onClick={handleContinue}>Continue to Home</button>
          </div>
        </div>
      )}
    </>
  );
};

export default GetBook;
