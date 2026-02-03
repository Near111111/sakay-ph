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
          <h1>SAKAY-PH</h1>
          <p>
            Sakay is a modern service provider platform that seamlessly connects
            drivers and riders, offering a smooth, fast, and reliable
            ride-hailing experience. Designed to be user- friendly, Sakay
            ensures comfort and convenience through a simple mobile application,
            making transportation easier and more accessible for everyone. Built
            through careful study and innovation, Sakay aims to become the most
            trusted and reliable platform nationwide. With strong goals for
            international expansion, Sakay envisions establishing itself as a
            leading global service provider in the ride-hailing industry. Sakay
            is available for download on both major mobile platforms:
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
          <h2>Safety</h2>
          <p>
            • We prioritize the protection and well-being of both riders and
            drivers in every trip and interaction.
          </p>
          <h2>Reliability & Speed</h2>
          <p>
            • We deliver fast, consistent, and dependable service that users can
            trust anytime, anywhere.
          </p>
          <h2>Driver Empowerment</h2>
          <p>
            • We support our drivers with fair earnings, incentives, respect,
            and opportunities for growth.
          </p>
          <h2>Customer-Centered Service</h2>
          <p>
            • We provide a friendly, user-focused platform that ensures comfort,
            convenience, and satisfaction.
          </p>
          <h2>Innovation & Technology</h2>
          <p>
            • We continuously improve our technology to meet the evolving needs
            of our users and provide world-class service.
          </p>
          <h2>Affordability</h2>
          <p>
            • We offer fair and competitive pricing to make transportation
            accessible to everyone.
          </p>
          <h2>Integrity & Respect</h2>
          <p>
            • We build strong and honest relationships with our drivers, riders,
            and partners.
          </p>
          <h2>Excellence in Service</h2>
          <p>
            • We are committed to delivering the highest standards in every
            aspect of our operations and services.
          </p>
        </div>
        <LegalDocuments />
        <FloatingChatBox />
      </div>
      <Footer />
    </>
  );
}
