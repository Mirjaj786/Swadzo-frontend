import React, { useState } from "react";
import NavBar from "./components/Navbar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footter/Footer.jsx";
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import FoodDetails from "./pages/FoodDetails/FoodDetails.jsx";
import Search from "./components/SearchPopup/Search.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrder from "./pages/MyOrders/MyOrder.jsx";
import SearchFood from "./pages/SearchFoundFood/SearchFood.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <ToastContainer />
      {showSearch ? <Search setShowSearch={setShowSearch} /> : <></>}
      {showLogin ? <LoginPage setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <NavBar setShowLogin={setShowLogin} setShowSearch={setShowSearch} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/place_order" element={<PlaceOrder />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/myorders" element={<MyOrder />}></Route>
          <Route path="/food_details" element={<FoodDetails />}></Route>
          <Route path="/search_Food" element={<SearchFood />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
