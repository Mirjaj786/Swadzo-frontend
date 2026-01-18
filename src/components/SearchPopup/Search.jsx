import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Search({ setShowSearch }) {
  const { url, searchFood, setSearchFood } = useContext(StoreContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.info("Please enter food or restaurant or category");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${url}/food/search`, {
        params: { input },
      });

      if (!res.data.success || res.data.data.length === 0) {
        toast.error("Food Not Found!");
        setSearchFood([]);
        setShowSearch(false);
      } else {
        toast.success("Food Found.");
        setSearchFood(res.data.data);
        setShowSearch(false);
        navigate("/search_Food");
      }
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-popup-container">
      <form className="search-input-container" onSubmit={handleSubmit}>
        <h3>Everything you need, Search here</h3>
        <p onClick={() => setShowSearch(false)}>
          <b>X</b>
        </p>

        <div className="input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="search-input"
            placeholder="Food name, restaurant, category..."
          />
        </div>

        <div className="search-btn-div">
          <button className="search-button" type="submit" disabled={loading}>
            {loading ? "Searching..." : <SearchIcon />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
