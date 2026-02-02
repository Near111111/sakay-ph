import React from "react";
import "../styles/JoinUs.css";
import Footer from "../components/Footer";
import FloatingChatBox from "../components/FloatingChatBox";

export default function JoinUs() {
  return (
    <>
      <div className="join-us-container">
        <div className="join-us-content">
          <h1>Join Us</h1>
          <p>Be part of something extraordinary</p>

          <div className="dropdowns-container">
            {/* Dropdown 1: Why SAKAY? */}
            <details className="dropdown">
              <summary className="dropdown-header">
                <span>Why SAKAY?</span>
                <svg
                  className="dropdown-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="dropdown-content">
                <ul>
                  <li>Flexible time - Ikaw bahal sa oras ng iyong biyahe</li>
                  <li>
                    Mababang commission - mas mataas na kita sa every biyahe
                  </li>
                  <li>Madaling application - fast and easy process</li>
                  <li>
                    Driver’s incentives - FREE 100 per 10 rides / ₱1,000 per 100
                    rides
                  </li>
                </ul>
              </div>
            </details>

            {/* Dropdown 2: Requirements */}
            <details className="dropdown">
              <summary className="dropdown-header">
                <span>Requirements</span>
                <svg
                  className="dropdown-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="dropdown-content">
                <ul>
                  <li>Professional Driver’s License</li>
                  <li>Vehicle registration (OR/CR)</li>
                  <li>NBI/Police clearance</li>
                </ul>
              </div>
            </details>

            {/* Dropdown 3: Steps on becoming a SAKAY rider */}
            <details className="dropdown">
              <summary className="dropdown-header">
                <span>Steps on becoming a SAKAY rider</span>
                <svg
                  className="dropdown-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="dropdown-content">
                <ol>
                  <li>
                    {" "}
                    I-download ang sakay app
                    https://play.google.com/store/apps/details?id=com.algovision.sakay_driver&pcampaignid=web_share
                  </li>
                  <li>
                    {" "}
                    Mag signup sa App at i upload and mga document required
                    A.OR/CR B.Pro-driver C.License NBI
                  </li>
                  <li>
                    {" "}
                    Pag Natapos na mag sign up mag pwede mag punta sa main
                    office para ma verify and makakuha ng schedule para sa skill
                    test or mag abang ng mga spot activation sa inyo lugar.
                  </li>
                  <li>
                    Iaacvate ng Sakay Staff ang inyong account after ng SKILL
                    TEST
                  </li>
                  <li>Start accepting rides and earning!</li>
                </ol>
              </div>
            </details>
          </div>
        </div>
        <FloatingChatBox />
      </div>
      <Footer />
    </>
  );
}
