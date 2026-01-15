import React, { useContext, useEffect, useState } from "react";
import "./FoodDetails.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { assets } from "../../assets/assets";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function FoodDetails() {
  const navigate = useNavigate();
  let { url, foodId, avgRating, setAvgRating, userId, token } =
    useContext(StoreContext);
  const [foodDetails, setFoodDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState(null);
  const [saveFoodId, setSaveFoodId] = useState("");

  const [value, setValue] = useState({
    content: "",
    rating: 0,
  });

  const getFoodDetails = async () => {
    try {
      if (!foodId && !saveFoodId) {
        toast.error("Invalid food ID");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${url}/food/${foodId || saveFoodId}`);
      setFoodDetails(res.data.data);
    } catch (error) {
      toast.error("Failed to load food details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllReview = async (req, res) => {
    try {
      const res = await axios.get(url + `/reviews/${foodId}`);
      // console.log(res.data.data);
      setReviewData(res.data.data);
    } catch (error) {}
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first.");
      return;
    }

    if (!value.content || !value.rating) {
      alert("Rating and content required");
      return;
    }

    try {
      const res = await axios.post(
        url + "/review/add",
        {
          food: foodId,
          content: value.content,
          rating: value.rating,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      if (res.data.success) {
        setValue({ content: "", rating: 0 });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleReviewDelete = async (reviwe_id) => {
    try {
      if (!token) {
        toast.error("Pleae login first!");
        return;
      }
      if (!reviwe_id) {
        console.log(`Review not found!`);
        return;
      }
      const isConfrom = window.confirm("are you sure to delete review?");
      if (!isConfrom) {
        return;
      }
      const res = await axios.delete(url + `/review/delete/${reviwe_id}`, {
        headers: {
          token: token,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setReviewData((prev) =>
          prev.filter((review) => reviwe_id !== review._id)
        );
      }
    } catch (error) {
      console.log(`error while delete review!`);
      toast.error(error.message);
    }
  };

  const handleContent = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (event, newValue) => {
    setValue((prev) => ({ ...prev, rating: newValue }));
  };

  useEffect(() => {
    if (!reviewData || reviewData.length === 0) {
      setAvgRating(0);
      return;
    }

    const total = reviewData.reduce((sum, r) => sum + (r.rating || 0), 0);

    const avg = total / reviewData.length;
    setAvgRating(avg);
  }, [reviewData]);

  useEffect(() => {
    if (foodId) {
      getFoodDetails();
      setSaveFoodId(foodId);
      getAllReview();
    }
  }, [foodId, value]);

  if (loading && !foodDetails) {
    return (
      <div className="verify">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!foodDetails) {
    return <p className="error">Food not found</p>;
  }

  return (
    <>
      <div className="food-item-details">
        <div className="food-img-container-details">
          <div className="image-container-details">
            <img
              src={`${url}/images/${foodDetails.image}`}
              alt={foodDetails.name}
              className="food-image-details"
            />
          </div>
        </div>

        <div className="food-item-info-details">
          <div className="food-name-rating-details">
            <p>
              {foodDetails.name} from , <b>{foodDetails.resturant}</b>
            </p>
            {/* <img src={assets.rating_starts} alt="rating" /> */}
          </div>

          <div className="avg-rating-cantainer">
            <div className="avg-rating">
              {avgRating.toFixed(1)} <span>★</span>
            </div>
            <div className="reviews">
              <span>{reviewData?.length || 0} reviews</span>
            </div>
          </div>

          <p className="food-description-details">{foodDetails.description}</p>
          <p className="food-price-details">₹ {foodDetails.price}</p>
          <hr />
          <div className="add-review">
            <h4>Rate this Food here...</h4>
            <form onSubmit={handleReviewSubmit}>
              <div className="rating">
                <Box sx={{ "& > legend": { mt: 2 } }}>
                  <Typography component="legend">Give Stars</Typography>
                  <Rating
                    name="rating"
                    value={value.rating}
                    onChange={handleRatingChange}
                    required
                  />
                </Box>
              </div>

              <div className="review-content">
                <textarea
                  name="content"
                  rows="4"
                  value={value.content}
                  onChange={handleContent}
                  placeholder="Write your review..."
                  required
                />
              </div>

              <button type="submit" className="review-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <p></p>
      <div className="all-reviews">
        {/* Reviews section */}

        {reviewData?.map((review, index) => (
          <div className="review-cart" key={index}>
            <div className="user-name">
              <div className="icon">
                <AccountCircleIcon />
              </div>
              <div>
                <b>{review.user?.name}</b>
              </div>
            </div>

            <p className="stars">
              <Rating className="star" value={review.rating} readOnly />
            </p>
            <p>{review.content}</p>

            {userId && String(review.user._id) === String(userId) && (
              <div
                className="delete-icon"
                onClick={() => handleReviewDelete(review._id)}
              >
                <DeleteIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default FoodDetails;
