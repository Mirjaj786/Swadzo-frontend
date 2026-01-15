import React, { useContext } from "react";
import "./DisplayFood.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function DisplayFood({ catagory }) {
  const { food_list, foodId, setFoodId } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (catagory === "All" || catagory === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
                catagory={item.catagory}
              />
            );
          }
          {
            setFoodId(item._id);
          }
        })}
      </div>
    </div>
  );
}

export default DisplayFood;
