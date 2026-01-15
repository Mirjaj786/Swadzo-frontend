import React from "react";
import "./PageNotFound.css";
import bgVideo from "./bg.mp4";

function PageNotFound() {
  return (
    <>
      <section className="page_404">
        <h1 className="error-code">404</h1>
        <div className="vdo">
          <video autoPlay loop muted playsInline className="bg-video">
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>
        <div className="center-box">
          <div className="content">
            <h3>Looks like you're lost</h3>
            <p>The page you are looking for is not available!</p>

            <a href="/" className="link_404">
              Go to Home
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
