import React from "react";
import "./Verify.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Verify() {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { url, token, setCartItem } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      const res = await axios.post(
        url + "/order/verify",
        {
          sessionId,
          success,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      if (res.data.success) {
        setCartItem({});
        toast.success("Order Placed. Thank you for your payment!");
        navigate("/myorders");
      } else {
        toast.error("Payment Failed! Please try again.");
        navigate("/");
      }
    } catch (err) {
      console.log("Verify Payment Error:", err.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
