"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../styles/OurServices.css";

export default function OurServices() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (selectedService) {
      // Lock scroll
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const services = [
    {
      title: "Car Rides",
      description: "Quickest way to beat the traffic",
      image: "/car.png",
      // EDIT YOUR INSTRUCTIONS HERE - Car Rides
      instructions:
        `Step 1: Download the SAKAY app from App Store or Google Play

Step 2: Open the app, select Ride or Delivery, then set up your pick-up and drop-off location, then confirm

Step 3: Select Type of Ride - Pick between the 3 types: Sedan, AUV/SUV or Motorcycle, then Book Ride

Step 4: Booking Summary - Double check your ride details and total fare, pick your payment method, then confirm booking

Step 5: Finding Your Driver - Searching for nearby drivers and wait for a driver to confirm your booking

Step 6: Track Your Booking - Wait for your driver and check where he/she is, then move to your designated pick-up point`.trim(),
    },
    {
      title: "Motorcycle",
      description: "Fast and efficient for quick trips around the city",
      image: "/motor.png",
      // EDIT YOUR INSTRUCTIONS HERE - Motorcycle
      instructions:
        `Step 1: Download the SAKAY app from App Store or Google Play

Step 2: Open the app, select Ride or Delivery, then set up your pick-up and drop-off location, then confirm

Step 3: Select Type of Ride - Pick between the 3 types: Sedan, AUV/SUV or Motorcycle, then Book Ride

Step 4: Booking Summary - Double check your ride details and total fare, pick your payment method, then confirm booking

Step 5: Finding Your Driver - Searching for nearby drivers and wait for a driver to confirm your booking

Step 6: Track Your Booking - Wait for your driver and check where he/she is, then move to your designated pick-up point`.trim(),
    },
    {
      title: "Delivery",
      description: "Reliable package and parcel delivery service",
      image: "/box.png",
      // EDIT YOUR INSTRUCTIONS HERE - Delivery
      instructions:
        `Step 1: Download the SAKAY app from App Store or Google Play

Step 2:  Select Ride or Delivery, set your pick-up and drop-off locations, then confirm.

Step 3: Choose ride type - Select Sedan, AUV/SUV, or Motorcycle, then book.

Step 4: Confirm booking - Check details and fare, choose payment method, then confirm.

Step 5: Finding Your Driver - Searching for nearby drivers and wait for a driver to confirm your booking

Step 6: Track your ride - Monitor your drivers location and go to the pick-up point.`.trim(),
    },
  ];

  const handleBookNow = (service) => {
    console.log("Book now clicked!", service);
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleProceed = () => {
    // Scroll to MobileAppShowcase section
    const showcaseSection = document.querySelector(".mobile-app-showcase");
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: "smooth" });
    }
    handleCloseModal();
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`services-section ${isVisible ? "visible" : ""}`}
      >
        {/* Animated Background Blobs */}
        <div className="background-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        {/* Background Image - VIOLET MAP BACKGROUND */}
        <div className="background-container">
          <Image
            src="/mb_showcase.png"
            alt="Our Services Background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            quality={100}
            priority={false}
          />
          <div className="overlay" />
        </div>

        {/* Content */}
        <div className="content">
          <h2 className={`title ${isVisible ? "visible" : ""}`}>
            <span className="title-gradient">OUR SERVICES</span>
          </h2>

          <div className="cards-container">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`service-card ${isVisible ? "card-visible" : ""}`}
                style={{
                  transitionDelay: `${index * 0.15}s`,
                }}
              >
                {/* Glowing Border */}
                <div className="card-border"></div>

                <div className="card-inner">
                  {/* Icon Badge */}
                  <div className="icon-badge">{service.icon}</div>

                  {/* Image with Glow */}
                  <div className="card-image-wrapper">
                    <div className="image-glow"></div>
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={120}
                      height={120}
                      style={{ width: "auto", height: "120px" }}
                    />
                  </div>

                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-description">{service.description}</p>

                  {/* Action Button */}
                  <button
                    type="button"
                    className="card-button"
                    onClick={() => handleBookNow(service)}
                  >
                    <span>Book now</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={handleCloseModal}
            >
              ×
            </button>

            <div className="modal-header">
              <div className="modal-icon-image">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  width={60}
                  height={60}
                  style={{ width: "auto", height: "60px" }}
                />
              </div>
              <h3 className="modal-title">{selectedService.title}</h3>
              <p className="modal-subtitle">Booking Instructions</p>
            </div>

            <div className="modal-body">
              <div className="instructions-text">
                {selectedService.instructions}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="proceed-button"
                onClick={handleProceed}
              >
                Download App
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
