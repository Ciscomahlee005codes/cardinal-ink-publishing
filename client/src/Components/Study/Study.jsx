import React, { useContext, useState } from "react";
import "./GetBook.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const GetBook = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, setCartItems } = useContext(StoreContext);

  const [isProceeding, setIsProceeding] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");

  // Controlled input states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
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
        <div className="place-order-left">
          <p className="delivery-information">Delivery Information</p>

          <div className="multi-fields">
            <div>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>

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
            placeholder="Home Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}

          <div className="multi-fields">
            <div>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div>
              <input
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <span className="error">{errors.state}</span>}
            </div>
          </div>

          <div className="multi-fields">
            <div>
              <input
                type="text"
                placeholder="Zip Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
              {errors.zip && <span className="error">{errors.zip}</span>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && <span className="error">{errors.country}</span>}
            </div>
          </div>

          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <div className="payment-method">
            <label htmlFor="payment">Payment Method</label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Card">Card Payment (Simulated)</option>
              <option value="Transfer">Bank Transfer</option>
              <option value="COD">Cash on Delivery</option>
            </select>
          </div>
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="card-total-details">
              <p>Subtotal</p>
              <p>₦{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delivery Fee</p>
              <p>₦{getTotalCartAmount() === 0 ? 0 : 1000}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total</b>
              <b>
                ₦
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 1000}
              </b>
            </div>
            <div id="cart-content">
              <button
                onClick={handleClick}
                className={`checkout-button ${isProceeding ? "proceeding" : ""}`}
                disabled={isProceeding}
              >
                {isProceeding ? "SUBMITTING..." : "SUBMIT ORDER"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {showConfirmation && (
        <div className="order-confirmation-popup">
          <div className="popup-inner">
            <h2>✅ Order Placed Successfully!</h2>
            <p>
              You will receive an email confirmation shortly with your order
              details and delivery updates.
            </p>
            <button onClick={handleContinue}>Continue to Home</button>
          </div>
        </div>
      )}
    </>
  );
};

export default GetBook;