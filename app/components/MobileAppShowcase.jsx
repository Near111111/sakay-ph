// MobileAppShowcase.jsx
"use client";

import React from "react";
import Image from "next/image";
import "../styles/MobileAppShowcase.css";
import AppleAndPlayStoreButton from "./AppleAndPlayStoreButton";

export default function MobileAppShowcase() {
  return (
    <section className="mobile-app-showcase">
      <div className="showcase-content">
        <div className="showcase-left">
          <h1 className="showcase-title">SAKAY anytime, anywhere</h1>
          <p className="showcase-description">
            Your Trusted Homegrown Mobility App for Everyday Travel
          </p>
          <AppleAndPlayStoreButton />
        </div>
        <div className="showcase-right">
          <Image
            src="/Phone.png"
            alt="Sakay Mobile App - Book your ride anytime, anywhere"
            width={400}
            height={800}
            className="phone-image"
            priority
          />
        </div>
      </div>
    </section>
  );
}
