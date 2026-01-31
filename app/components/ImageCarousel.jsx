"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/ImageCarousel.css";

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array of your images from sakay_pictures folder
  const images = [
    "/sakay_pictures/sakay_pic1.jpg",
    "/sakay_pictures/sakay_pic2.jpg",
    "/sakay_pictures/sakay_pic3.jpg",
    "/sakay_pictures/sakay_pic4.jpg",
    "/sakay_pictures/sakay_pic5.jpg",
    "/sakay_pictures/sakay_pic6.jpg",
    "/sakay_pictures/sakay_pic7.jpg",
    "/sakay_pictures/sakay_pic8.jpg",
    "/sakay_pictures/sakay_pic9.jpg",
  ];

  // Auto-swipe every 3 seconds
  useEffect(() => {
    const nextSlide = () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setTimeout(() => setIsTransitioning(false), 500);
      }
    };

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning, images.length]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {/* Previous Button */}
        <button
          className="carousel-button carousel-button-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Images */}
        <div className="carousel-track">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "active" : ""
              } ${
                index === (currentIndex - 1 + images.length) % images.length
                  ? "prev"
                  : ""
              } ${index === (currentIndex + 1) % images.length ? "next" : ""}`}
            >
              <Image
                src={image}
                alt={`Sakay PH ${index + 1}`}
                fill
                className="carousel-image"
                style={{ objectFit: "cover" }}
                quality={75}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          className="carousel-button carousel-button-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
