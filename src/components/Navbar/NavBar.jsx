import React, { useContext, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar({ setShowLogin, setShowSearch }) {
  const [menu, setMenu] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const [showDropDown, setShowDropDown] = useState(true);
  const { getTotalCartAmount, token, setToken, user_name, userRole } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    const isConfrom = window.confirm("Are you sure to logout?");
    if (isConfrom) {
      localStorage.removeItem("token");
      setToken("");
      toast.success("Logout Successfull.");
      navigate("/");
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo_3} alt="logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>

        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact
        </a>
      </ul>

      <div className="navbar_right">
        <img
          src={assets.search_icon}
          alt="search"
          onClick={() => setShowSearch(true)}
        />

        <div className="navbar_search_icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)} className="button">
            Create Account
          </button>
        ) : (
          <div
            onClick={() => setShowDropDown(!showDropDown)}
            className="nav-profile"
          >
            <img src={assets.profile_icon} alt="Profile Image" />
            {showDropDown && (
              <ul className="nav-profile-dropdown">
                <li>
                  <AccountCircleIcon />
                  <p>{user_name || "Guest"}</p>
                </li>
                <Link to={"/myorders"}>
                  <li>
                    <img src={assets.bag_icon} alt="bag" />
                    <p>Orders</p>
                  </li>
                </Link>
                <hr />
                <li onClick={() => {
                  if (userRole === "admin") {
                    window.location.href = `http://localhost:5174/?token=${token}`; // Assuming Admin runs on this port
                  } else {
                    toast.error("You are not an Admin");
                  }
                }}>
                  <img src={assets.profile_icon} alt="admin" />
                  <p>Admin Panel</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}

        <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
          ☰<i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      {showMenu && (
        <div className="mobile-menu">
          <p onClick={() => setShowMenu(false)} className="cross-icon">
            &times;
          </p>
          <Link to="/" onClick={() => setShowMenu(false)}>
            Home
          </Link>
          <a href="#explore-menu" onClick={() => setShowMenu(false)}>
            Menu
          </a>
          <a href="#app-download" onClick={() => setShowMenu(false)}>
            Mobile App
          </a>
          <a href="#footer" onClick={() => setShowMenu(false)}>
            Contact
          </a>
          <button onClick={() => setShowLogin(true)} className="button sign-in">
            Create Account
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
