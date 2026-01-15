import React, { useContext, useEffect, useState } from "react";
import "./MyOrder.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { assets } from "../../assets/assets.js";

function MyOrder() {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(url + "/userorders", {
        headers: {
          token: token,
        },
      });

      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log("Fetch orders error:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div className="my-orders-order" key={index}>
              <img src={assets.parcel_icon} alt="parcel_icon" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>

              <p>Total Amount: ₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span
                  className={
                    order.status === ("Delivered" && "delivered")
                      ? "green"
                      : "red" && order.status === "Food Processing"
                      ? "yellow"
                      : "red"
                  }
                >
                  {" "}
                  &#x25cf;
                </span>
                <b>{order.status}</b>{" "}
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrder;
