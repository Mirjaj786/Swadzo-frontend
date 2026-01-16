import React, { useContext } from "react";
import "./DisplayFood.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Skeleton from '../Skeleton/Skeleton';

function DisplayFood({ catagory }) {
  const { food_list, foodId, setFoodId, loading } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {loading ? (
          // Render 8 Skeletons for loading state
          Array(8).fill(0).map((_, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Skeleton width="100%" height="200px" borderRadius="15px" />
              <Skeleton width="70%" height="20px" borderRadius="4px" />
              <Skeleton width="90%" height="15px" borderRadius="4px" />
              <Skeleton width="100%" height="20px" borderRadius="4px" />
            </div>
          ))
        ) : (
          food_list.map((item, index) => {
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
          })
        )}
      </div>
    </div>
  );
}

export default DisplayFood;
