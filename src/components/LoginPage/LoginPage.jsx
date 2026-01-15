import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
function LoginPage({ setShowLogin }) {
  const { url } = useContext(StoreContext);
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [cuurState, setCurrState] = useState("sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      let newUrl = url;
      e.preventDefault();

      if (cuurState === "Login") {
        newUrl += "/user/login";
      } else {
        newUrl += "/user/register";
      }

      const res = await axios.post(newUrl, data);

      if (res) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log("Frontend auth error:", err.message);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-page" id="login-page">
      <form
        onSubmit={handleSubmit}
        className="login-page-container needs-validation"
      >
        <div className="login-page-title">
          <h2>{cuurState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-page-input">
          {cuurState === "Login" ? (
            <></>
          ) : (
            <>
              <label htmlFor="name">Enter Your Name*</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                id="name"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                required
              />
            </>
          )}
          <label htmlFor="email">Enter email*</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Enter email"
            required
          />
          <label htmlFor="passwoord">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit">
          {cuurState === "sign up" ? "Create Account" : "Login"}{" "}
        </button>
        <div className="login-page-condition">
          <input type="checkbox" required />
          <p>Agree to terms and conditions</p>
        </div>

        <div className="">
          {cuurState === "sign up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("sign up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
