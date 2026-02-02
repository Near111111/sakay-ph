"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../styles/OurServices.css";

export default function OurServices() {
  const [isVisible, setIsVisible] = useState(false);
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
      description: "Quickest wau to beat the traffic",
      image: "/car.png",
      gradient: "from-purple-500 to-pink-500",
      icon: "🚗",
    },
    {
      title: "Motorcycle",
      description: "Fast and efficient for quick trips around the city",
      image: "/motor.png",
      gradient: "from-blue-500 to-cyan-500",
      icon: "🏍️",
    },
    {
      title: "Delivery",
      description: "Reliable package and parcel delivery service",
      image: "/box.png",
      gradient: "from-orange-500 to-yellow-500",
      icon: "📦",
    },
  ];

  return (
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

      {/* Background Image */}
      <div className="background-container">
        <Image
          src="/services_bg.png"
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
              {/* Rotating Ring */}
              <div className="card-ring"></div>

              {/* Glowing Border */}
              <div className="card-border"></div>

              {/* Particles */}
              <div className="particles">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="particle"></div>
                ))}
              </div>

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
                <button className="card-button">
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
  );
}
