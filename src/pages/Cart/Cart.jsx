import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";

function Cart() {
  const navigate = useNavigate();
  const { cartItem, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const hasItems = food_list.some((item) => cartItem[item._id] > 0);

  if (!hasItems) {
    return (
      <div className="empty-cart">
        <h3>OPPs! Your Cart is Empty!</h3>
        <button onClick={() => navigate("/")}>
          Shop Now{" "}
          <p>
            <img className="basket-icon" src={assets.basket_icon} alt="" />
          </p>
        </button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>₹ {item.price * cartItem[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹ {getTotalCartAmount()}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹ {getTotalCartAmount() === 0 ? 0 : 30}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>
              ₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 30}
            </b>
          </div>

          <Link to="/place_order">
            <button>PROCEED TO CHECKOUT</button>
          </Link>
        </div>

        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
