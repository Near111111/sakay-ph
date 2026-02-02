import React from "react";
import Footer from "../components/Footer";
import FloatingChatBox from "../components/FloatingChatBox";
import "../styles/AboutUs.css";
import LegalDocuments from "../components/LegalDocuments";

export default function AboutUs() {
  return (
    <>
      <div className="about-us-container">
        <div className="about-us-content">
          <h1>WHO IS SAKAY-PH</h1>
          <p>
            SAKAY-PH is founded in October 2025 by Mr. Argel Villaluna, with its
            vision to be number one and internationally recognized on ride
            hailing service platform. and its mission on the safety of its
            stakeholders. To give more incentives and earnings for our drivers.
            To provide high quality service.
          </p>
          <h1>SAKAY-PH</h1>
          <p>
            SAKAY-PH CORP is a Philippine-based ride-hailing and mobility
            services provider committed to making transportation more
            accessible, reliable, and technology-driven. The company connects
            commuters to licensed TNVS drivers through a seamless mobile
            application that ensures convenience, transparency, and safety.
          </p>
          <h1>VISION</h1>
          <p>
            SAKAY-PH is founded in October 2025 by Mr. Argel Villaluna, with its
            vision to be number one and internationally recognized on ride
            hailing service platform. and its mission on the safety of its
            stakeholders. To give more incentives and earnings for our drivers.
            To provide high quality service.
          </p>
          <h1>MISSION</h1>
          <p>
            Safety of the driver while getting a booking. Safety of the rider
            while booking for a ride. Fastest service platform to our users. To
            give more incentives and earnings for our drivers. Experience
            friendly user platform. To provide the high-quality service
            platform. To give low fare to our rider and feel the safety while
            riding. To give the best relationship to our driver
          </p>
          <h1>CORE VALUES</h1>
          <p>
            Safety • Innovation • Integrity • Service Excellence • Community
            Empowerment
          </p>
        </div>
        <LegalDocuments />
        <FloatingChatBox />
      </div>
      <Footer />
    </>
  );
}
