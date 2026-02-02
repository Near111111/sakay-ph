// MobileAppShowcase.jsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "../styles/MobileAppShowcase.css";
import AppleAndPlayStoreButton from "./AppleAndPlayStoreButton";

export default function MobileAppShowcase() {
  const showcaseLeftRef = useRef(null);
  const showcaseRightRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Trigger when 30% of the element is visible
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    if (showcaseLeftRef.current) {
      observer.observe(showcaseLeftRef.current);
    }
    if (showcaseRightRef.current) {
      observer.observe(showcaseRightRef.current);
    }

    return () => {
      if (showcaseLeftRef.current) {
        observer.unobserve(showcaseLeftRef.current);
      }
      if (showcaseRightRef.current) {
        observer.unobserve(showcaseRightRef.current);
      }
    };
  }, []);

  return (
    <section className="mobile-app-showcase">
      <div className="showcase-content">
        <div ref={showcaseLeftRef} className="showcase-left">
          <h1 className="showcase-title">SAKAY anytime, anywhere</h1>
          <p className="showcase-description">
            Your Trusted Homegrown Mobility App for Everyday Travel
          </p>
          <AppleAndPlayStoreButton />
        </div>
        <div ref={showcaseRightRef} className="showcase-right">
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
