// MobileAppShowcase.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../styles/MobileAppShowcase.css";
import AppleAndPlayStoreButton from "./AppleAndPlayStoreButton";

export default function MobileAppShowcase() {
  const showcaseLeftRef = useRef(null);
  const showcaseRightRef = useRef(null);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const phoneImages = [
    "/Phone.png",
    "/legal_showcase/accreditation.png",
    "/legal_showcase/accreditation1.jpg",
  ];

  // Custom timing: 2s, 10s, 10s, repeat
  const slideTimings = [3000, 10000, 10000]; // milliseconds

  // Auto-slide effect with custom timing pattern
  useEffect(() => {
    const currentTiming = slideTimings[currentSlide];

    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % phoneImages.length);
    }, currentTiming);

    return () => clearTimeout(timeout);
  }, [currentSlide, phoneImages.length]);

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
          <p className="qr-code-hint">👆 Click here to download SAKAY app!</p>
        </div>
        <div ref={showcaseRightRef} className="showcase-right">
          <div className="phone-carousel">
            {phoneImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Sakay Mobile App - Screen ${index + 1}`}
                width={400}
                height={800}
                className={`phone-image ${
                  index === currentSlide ? "active" : ""
                }`}
                priority={index === 0}
              />
            ))}
          </div>

          {/* Carousel indicators */}
          <div className="carousel-indicators">
            {phoneImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
