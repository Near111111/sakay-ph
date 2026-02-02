"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/LegalDocuments.css";

export default function LegalDocuments() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array of your images and corresponding PDF links
  const documents = [
    {
      image: "/legal_docs/acrediation.png",
      pdf: "/pdf_links/acrediation.pdf",
      title: "Accreditation",
    },
    {
      image: "/legal_docs/certificate_of_acreditation.png",
      pdf: "/pdf_links/certificate_of_acreditation.pdf",
      title: "Certificate of Acreditation",
    },
    {
      image: "/legal_docs/business_permit.png",
      pdf: "/pdf_links/business_permit.png",
      title: "Business Permit",
    },
    {
      image: "/legal_docs/certificate_of_incorporation.png",
      pdf: "/pdf_links/certificate_of_incorporation.pdf",
      title: "Certificate of Incorporation",
    },
  ];

  // Auto-swipe every 3 seconds
  useEffect(() => {
    const nextSlide = () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % documents.length);
        setTimeout(() => setIsTransitioning(false), 500);
      }
    };

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning, documents.length]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % documents.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(
        (prev) => (prev - 1 + documents.length) % documents.length,
      );
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

  const handleImageClick = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
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
          {documents.map((doc, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "active" : ""
              } ${
                index ===
                (currentIndex - 1 + documents.length) % documents.length
                  ? "prev"
                  : ""
              } ${index === (currentIndex + 1) % documents.length ? "next" : ""}`}
              onClick={() => handleImageClick(doc.pdf)}
              style={{ cursor: "pointer" }}
              title={`Click to view ${doc.title}`}
            >
              <Image
                src={doc.image}
                alt={doc.title}
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
        {documents.map((_, index) => (
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
