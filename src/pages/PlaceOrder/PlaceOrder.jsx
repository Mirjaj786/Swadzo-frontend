import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import axios from "axios";
import { toast } from "react-toastify";

import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItem, url } =
    useContext(StoreContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    pincode: "",
    landmark: "",
    fullAddress: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    console.log("Placing order...");

    if (!token) {
      alert("Please login first!");
      return;
    }

    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id]) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: formData,
      items: orderItems,
      amount: getTotalCartAmount() + 30,
    };

    try {
      setLoading(true);
      let res = await axios.post(url + "/order/place", orderData, {
        headers: {
          token: token,
        },
      });

      if (res.data.success) {
        const { session_url } = res.data;
        window.location.replace(session_url);
      } else {
        toast.error("Faile to place order. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Place Order Error:", err.message);
      alert("Order failed");
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.info("Please login to place order");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      toast.info("Your cart is empty. Please add items to place order.");
      navigate("/cart");
    }
  }, [token]);

  return (
    <div className="place-order">
      <form onSubmit={placeOrder} className="place-order-container ">
        <div className="place-order-left">
          <h2>Delivery Information</h2>

          <input
            type="text"
            id="fullName"
            name="fullName"
            onChange={onChangeHandler}
            value={formData.fullName}
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            id="email"
            name="email"
            onChange={onChangeHandler}
            value={formData.email}
            placeholder="Email Address"
            required
          />

          <input
            type="text"
            id="phone"
            name="phone"
            onChange={onChangeHandler}
            value={formData.phone}
            placeholder="Phone Number"
            required
          />
          <input
            type="text"
            placeholder="State"
            id="state"
            name="state"
            onChange={onChangeHandler}
            value={formData.state}
            required
          />

          <div className="place-order-row">
            <input
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={formData.city}
              placeholder="City"
              required
            />

            <input
              type="text"
              name="pincode"
              onChange={onChangeHandler}
              value={formData.pincode}
              placeholder="Pincode"
              required
            />
          </div>
          <input
            type="text"
            name="landmark"
            onChange={onChangeHandler}
            value={formData.landmark}
            placeholder="Landmark"
            required
          />

          <input
            type="text"
            name="fullAddress"
            onChange={onChangeHandler}
            value={formData.fullAddress}
            placeholder="Full Address"
            required
          />
        </div>

        <div className="place-order-right">
          <h2>Order Summary</h2>

          <div className="order-summary">
            <div>
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <div>
              <p>Delivery Fee</p>
              <p>₹ 30</p>
            </div>
            <hr />
            <div className="total">
              <b>Total</b>
              <b>₹ {getTotalCartAmount() + 30}</b>
            </div>
          </div>

          <button className="place-order-btn" type="submit" disabled={loading}>
            {loading ? "Processing..." : "PLACE ORDER"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
