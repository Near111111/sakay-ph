"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AppleAndPlayStoreButton from "./AppleAndPlayStoreButton";
import ImageCarousel from "./ImageCarousel";

export default function AnimatedHero() {
  const [headingText, setHeadingText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullHeading =
    "SAKAY na sa bagong ride hailing app SAKAY-PH para satin to!";
  const fullDescription =
    "Experience safe, reliable, and affordable transportation with Sakay PH. Book your ride today and get to your destination with ease.";

  useEffect(() => {
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

    return () => {
      clearInterval(headingInterval);
    };
  }, []);

  return (
    <>
      {/* Hero Section with Header Image */}
      <section
        style={{
          marginTop: "72px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            animation: "fadeInDown 1s ease-out",
          }}
        >
          <Image
            src="/sakay_header.png"
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

      <div style={{ animation: "fadeInUp 1s ease-out 0.2s backwards" }}>
        <AppleAndPlayStoreButton />
      </div>

      {/* Content Section */}
      <div
        style={{
          minHeight: "calc(100vh - 572px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px 80px 20px",
          background: "#ffffff",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "900px" }}>
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: "bold",
              color: "#4e2780",
              marginBottom: "1.5rem",
              lineHeight: "1.4",
              minHeight: "120px",
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
              color: "#6b7280",
              lineHeight: "1.8",
              marginBottom: "2rem",
              minHeight: "80px",
            }}
          >
            {descriptionText}
            {descriptionText.length > 0 &&
              descriptionText.length < fullDescription.length &&
              showCursor && <span className="cursor">|</span>}
          </p>
        </div>
      </div>

      {/* Image Carousel Section */}
      <section
        style={{
          background: "linear-gradient(to bottom, #ffffff, #f9fafb)",
          padding: "60px 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h3
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#4e2780",
              marginBottom: "1rem",
            }}
          >
            Gallery
          </h3>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Take a look at our fleet and see what makes Sakay PH the best choice
            for your transportation needs
          </p>
        </div>
        <ImageCarousel />
      </section>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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
          color: #4e2780;
        }

        h2,
        p {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
}
