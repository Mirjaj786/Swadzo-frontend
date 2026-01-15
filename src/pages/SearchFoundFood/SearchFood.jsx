import React, { useContext, useEffect } from "react";
import "./SearchFood.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SearchFood() {
  const {
    url,
    searchFood,
    addToCart,
    removeFromCart,
    foodId,
    setFoodId,
    allReviewsByFood,
    cartItem,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleOnClick = (foodId) => {
    setFoodId(foodId);
    navigate("/food_details");
  };

  return (
    <>
      <div className="search-food-grid">
        {searchFood && searchFood.length > 0 ? (
          searchFood.map((item, index) => (
            <div className="s-food-item" key={index}>
              <div className="s-food-img-container">
                <div className="s-image-container">
                  <img
                    src={url + "/images/" + item.image}
                    alt="Food"
                    className="s-food-image"
                  />
                </div>

                {!cartItem[item._id] ? (
                  <img
                    onClick={() => addToCart(item._id)}
                    className="s-add-icon"
                    src={assets.add_icon_white}
                    alt="Food Add"
                  />
                ) : (
                  <div className="s-food-counter">
                    <img
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_red}
                      alt=""
                    />
                    <p>{cartItem[item._id]}</p>
                    <img
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_green}
                      alt=""
                    />
                  </div>
                )}
              </div>

              <div className="s-food-item-info">
                <div className="s-food-name-rating">
                  <p onClick={() => handleOnClick(item._id)}>{item.name}</p>
                  <img src={assets.rating_starts} alt="rating" />
                </div>
                <p className="s-food-description">{item.description}</p>
                <p className="s-food-price">₹ {item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="s-no-food">
            <h3>Food Not Found 😕</h3>
            <Link to={"/"}>
              <button>Go to Home</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchFood;
