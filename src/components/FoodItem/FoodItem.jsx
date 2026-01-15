import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function FoodItem({ id, name, image, price, description, catagory }) {
  const {
    addToCart,
    removeFromCart,
    cartItem,
    url,
    foodId,
    setFoodId,
    getFoodId,
    allReviewsByFood,
  } = useContext(StoreContext);

  const review = allReviewsByFood[id] || [];

  const navigate = useNavigate();
  const handleClick = (id) => {
    const result_id = getFoodId(id);
    setFoodId(result_id);
    navigate("/food_details");
  };
  const avgRating =
    review.length === 0
      ? 0
      : (review.reduce((sum, r) => sum + r.rating, 0) / review.length).toFixed(
          1
        );

  useEffect(() => {
    getFoodId(id);
    setFoodId(id);
  }, [id]);

  return (
    <div className="food-item">
      <div className="food-img-container">
        <div className="image-container">
          <img
            src={url + "/images/" + image}
            alt="Food"
            className="food-image"
          />
        </div>
        {!cartItem[id] ? (
          <img
            onClick={() => addToCart(id)}
            className="add-icon"
            src={assets.add_icon_white}
            alt="Food Add"
          />
        ) : (
          <div className="food-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItem[id] || 0}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info" onClick={() => handleClick(id)}>
        <div className="food-name-rating">
          <p>{name}</p>
        </div>
        <div className="_rating">
           <span>{avgRating} &nbsp;★</span>
          <p>{review?.length || 0} reviews</p>
        </div>
        <p className="food-description">{description}</p>
        <p className="food-price"> &#8377; {price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
