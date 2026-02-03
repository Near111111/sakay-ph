"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AppleAndPlayStoreButton from "./AppleAndPlayStoreButton";
import ImageCarousel from "./ImageCarousel";

export default function AnimatedHero() {
  const [headingText, setHeadingText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const contentRef = useRef(null);

  const fullHeading =
    "SAKAY na sa bagong ride hailing app SAKAY-PH para satin to!";
  const fullDescription =
    "Experience safe, reliable, and affordable transportation with Sakay PH. Book your ride today and get to your destination with ease.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger animation when section is visible and hasn't animated yet
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startTypewriterEffect();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px",
      },
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, [hasAnimated]);

  const startTypewriterEffect = () => {
    let headingIndex = 0;
    let descriptionIndex = 0;

    // Type heading first
    const headingInterval = setInterval(() => {
      if (headingIndex < fullHeading.length) {
        setHeadingText(fullHeading.slice(0, headingIndex + 1));
        headingIndex++;
      } else {
        clearInterval(headingInterval);

        // Start typing description after heading is done
        setTimeout(() => {
          const descriptionInterval = setInterval(() => {
            if (descriptionIndex < fullDescription.length) {
              setDescriptionText(
                fullDescription.slice(0, descriptionIndex + 1),
              );
              descriptionIndex++;
            } else {
              clearInterval(descriptionInterval);
              setShowCursor(false); // Hide cursor when done
            }
          }, 30); // Speed ng typing para sa description
        }, 300); // Delay before starting description
      }
    }, 50); // Speed ng typing para sa heading
  };

  return (
    <>
      {/* Content Section */}
      <div
        ref={contentRef}
        style={{
          minHeight: "calc(100vh - 572px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px 80px 20px",
          background: "linear-gradient(to bottom, #ffffff, #fafbff)",
          position: "relative",
        }}
      >
        {/* Decorative background elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(78, 39, 128, 0.08), transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "250px",
            height: "250px",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.06), transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            textAlign: "center",
            maxWidth: "900px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #4e2780 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1.5rem",
              lineHeight: "1.4",
              minHeight: "120px",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 20px rgba(78, 39, 128, 0.1)",
            }}
          >
            {headingText}
            {headingText.length < fullHeading.length && showCursor && (
              <span className="cursor">|</span>
            )}
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#64748b",
              lineHeight: "1.8",
              marginBottom: "2rem",
              minHeight: "80px",
              fontWeight: "400",
              letterSpacing: "-0.01em",
            }}
          >
            {descriptionText}
            {descriptionText.length > 0 &&
              descriptionText.length < fullDescription.length &&
              showCursor && <span className="cursor">|</span>}
          </p>
        </div>
      </div>

      {/* Hero Section with Header Image (Map) */}
      <section
        style={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background: "transparent",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          {/* Subtle overlay for depth */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(78, 39, 128, 0.05), transparent)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Image
            src="/coming_soon.png"
            alt="Sakay PH"
            width={1920}
            height={500}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
            quality={100}
            unoptimized
            priority
          />
        </div>
      </section>

      {/* Image Carousel Section */}
      <section
        style={{
          background: "linear-gradient(to bottom, #fafbff, #f8f9ff)",
          padding: "60px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(78, 39, 128, 0.05), transparent 70%)",
            borderRadius: "50%",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h3
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #4e2780 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Gallery
          </h3>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.7",
              fontWeight: "400",
            }}
          >
            Take a look at our fleet and see what makes Sakay PH the best choice
            for your transportation needs
          </p>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <ImageCarousel />
        </div>
      </section>

      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s infinite;
          background: linear-gradient(135deg, #4e2780 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        h2,
        p {
          transition: all 0.3s ease;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          h2 {
            font-size: 2rem !important;
            min-height: 90px !important;
          }

          p {
            font-size: 1.1rem !important;
            min-height: 70px !important;
          }

          h3 {
            font-size: 2rem !important;
          }
        }

        @media (max-width: 480px) {
          h2 {
            font-size: 1.6rem !important;
            min-height: 80px !important;
          }

          p {
            font-size: 1rem !important;
            min-height: 60px !important;
          }

          h3 {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
    </>
  );
}
