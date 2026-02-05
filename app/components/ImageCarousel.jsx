"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "../styles/ImageCarousel.css";

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);
  const headerRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

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
    "/sakay_pictures/sakay_pic10.jpg",
    "/sakay_pictures/sakay_pic11.jpg",
    "/sakay_pictures/sakay_pic12.jpg",
    "/sakay_pictures/sakay_pic13.jpg",
    "/sakay_pictures/sakay_pic14.jpg",
  ];

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Auto-play prevented:", error);
      });
    }
  }, []);

  // Scroll animation for header text
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before reaching viewport
      },
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

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
      <div className="gallery-layout">
        {/* Left Side - Portrait Video */}
        <div className="video-section">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              className="portrait-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="/video_showcase/driving_test03.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay Info */}
            <div className="video-overlay">
              <div className="video-info">
                <h3 className="video-headline">RIDE SECURE</h3>
                <p className="video-subtext">Best in class transportation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image Carousel */}
        <div className="carousel-section">
          {/* Gallery Header - Above carousel only */}
          <div
            ref={headerRef}
            className={`gallery-header ${isHeaderVisible ? "animate-in" : ""}`}
          >
            <h2 className="gallery-title">Explore Our Rides</h2>
            <p className="gallery-subtitle">
              Take a look at our fleet and see what makes Sakay PH the best
              choice for your transportation needs
            </p>
          </div>

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
      </div>
    </div>
  );
}
