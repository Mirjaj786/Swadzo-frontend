import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [foodId, setFoodId] = useState("");
  const [userId, setUserId] = useState("");
  const [user_name, setUser_name] = useState("");
  const [searchFood, setSearchFood] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [allReviewsByFood, setAllReviewsByFood] = useState({});

  const url = "http://localhost:4000";

  const addToCart = async (item_id) => {
    if (!cartItem[item_id]) {
      setCartItem((prev) => ({ ...prev, [item_id]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [item_id]: prev[item_id] + 1 }));
    }

    if (token) {
      axios.post(
        url + "/cart/add",
        { itemId: item_id },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (item_id) => {
    setCartItem((prev) => {
      if (!prev[item_id]) return prev;

      if (prev[item_id] === 1) {
        const updatedCart = { ...prev };
        delete updatedCart[item_id];
        return updatedCart;
      }

      return { ...prev, [item_id]: prev[item_id] - 1 };
    });

    if (token) {
      try {
        await axios.post(
          url + "/cart/remove",
          { itemId: item_id },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Remove cart error:", err.message);
      }
    }
  };

  const loadCartData = async (token) => {
    try {
      const res = await axios.get(url + "/cart/get", {
        headers: { token },
      });
      setCartItem(res.data.cartData || {});
    } catch (err) {
      console.log(`error to load cartData : ${err.message}`);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItem) {
      const quantity = cartItem[itemId];

      if (quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);

        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const getFoodId = (food_id) => {
    return food_id;
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(url + "/food/list");
      setFoodList(res.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error.message);
    }
  };

  //  group all review by food id
  const groupReviewsByFood = (reviews) => {
    const grouped = {};

    reviews.forEach((review) => {
      const foodId = review.food._id;

      if (!grouped[foodId]) {
        grouped[foodId] = [];
      }

      grouped[foodId].push(review);
    });

    return grouped;
  };

  const getAllReview = async () => {
    try {
      const res = await axios.get(url + "/review/all");
      if (res.data.success) {
        const groupedReviews = groupReviewsByFood(res.data.data);
        setAllReviewsByFood(groupedReviews);
      } else {
        toast.error("Review Not Found");
      }
    } catch (error) {
      console.log(`error to find all review`);
      return;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        await loadCartData(token);
      }
    };

    loadData();
    getAllReview();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${url}/auth/me`, {
        headers: {
          token: token,
        },
      });
      setUserId(res.data.user_id);
      setUser_name(res.data.user_name);
    };

    fetchUser();
  }, [food_list]);

  const contextValue = {
    food_list,
    cartItem,
    token,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    setToken,
    url,
    foodId,
    setFoodId,
    getFoodId,
    searchFood,
    setSearchFood,
    avgRating,
    allReviewsByFood,
    setAvgRating,
    userId,
    user_name,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
