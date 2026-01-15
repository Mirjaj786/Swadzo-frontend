import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo_3} alt="logo" className="footer-logo" />
          <p>
            At Swadzo, we believe great food should be easy to enjoy. Discover
            local favorites, place orders in seconds, and get hot, delicious
            meals delivered right to your door. Trusted by thousands
          </p>
          <p className="footer-tagline">
            Trusted by thousands  • Fast delivery  • Secure payments
          </p>

          <div className="footer-social-icon">
            <img className="f" src={assets.facebook_icon} alt="facebook" />
            <img className="t" src={assets.twitter_icon} alt="twitter" />
            <img className="l" src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TECH</h2>
          <ul>
            <li>+91 XXXXXXXXXX </li>
            <li>contact@swadzo.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © {new Date().getFullYear()} Swadzo — All right reserved ❤️ by Mirjaj
        Ajij Milon.
      </p>
    </div>
  );
}

export default Footer;
