import React from "react";
import Footer from "../components/Footer";
import FloatingChatBox from "../components/FloatingChatBox";
import "../styles/AboutUs.css";
import ImageCarousel from "../components/ImageCarousel";

export default function AboutUs() {
  return (
    <>
      <div className="about-us-container">
        <div className="about-us-content">
          <h1>Who is SAKAY-PH</h1>
          <p>
            SAKAY-PH is founded in October 2025 by Mr. Argel Villaluna, with its
            vision to be number one and internationally recognized on ride
            hailing service platform. and its mission on the safety of its
            stakeholders. To give more incentives and earnings for our drivers.
            To provide high quality service.
          </p>
        </div>
        <ImageCarousel />
        <FloatingChatBox />
      </div>
      <Footer />
    </>
  );
}
