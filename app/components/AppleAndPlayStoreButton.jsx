"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import "../styles/AppleAndPlayStoreButton.css";

export default function AppleAndPlayStoreButton() {
  const [showModal, setShowModal] = useState(false);
  const [qrImages, setQrImages] = useState({ driver: "", passenger: "" });
  const [qrLinks, setQrLinks] = useState({ driver: "", passenger: "" });
  const [modalTitle, setModalTitle] = useState("");

  // Lock/unlock scroll when modal opens/closes
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const handlePlayStoreClick = () => {
    setQrImages({
      driver: "/qr_pictures/google_driver_qr.png",
      passenger: "/qr_pictures/google_passenger_qr.png",
    });
    setQrLinks({
      driver:
        "https://play.google.com/store/apps/details?id=com.algovision.sakay_driver&hl=en",
      passenger:
        "https://play.google.com/store/apps/details?id=com.algovision.sakay_passengers&hl=en",
    });
    setModalTitle("Google Play Store");
    setShowModal(true);
  };

  const handleAppStoreClick = () => {
    setQrImages({
      driver: "/qr_pictures/ios_driver_qr.png",
      passenger: "/qr_pictures/ios_passenger_qr.png",
    });
    setQrLinks({
      driver: "https://apps.apple.com/ph/app/sakayph-drivers/id6755422440",
      passenger: "https://apps.apple.com/ph/app/sakayph/id6755413428",
    });
    setModalTitle("App Store");
    setShowModal(true);
  };

  return (
    <>
      <div className="store-buttons-container">
        {/* Google Play Button */}
        <button onClick={handlePlayStoreClick} className="app-store-button">
          <Image
            src="/sakay_playstore2.png"
            alt="Get it on Google Play"
            width={160}
            height={48}
            className="store-button-image"
            style={{ width: "auto", height: "48px" }}
          />
        </button>

        {/* App Store Button */}
        <button onClick={handleAppStoreClick} className="app-store-button">
          <Image
            src="/appstore.png"
            alt="Download on the App Store"
            width={160}
            height={48}
            className="store-button-image"
            style={{ width: "auto", height: "48px" }}
          />
        </button>
      </div>

      {/* QR Code Modal - RENDERED VIA PORTAL */}
      {typeof window !== "undefined" &&
        showModal &&
        createPortal(
          <div className="qr-modal-overlay" onClick={() => setShowModal(false)}>
            <div
              className="qr-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="qr-modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h2>{modalTitle}</h2>
              <div className="qr-codes-container">
                <div className="qr-code-item">
                  <h3>Driver App</h3>
                  <a
                    href={qrLinks.driver}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={qrImages.driver}
                      alt="Driver QR Code"
                      width={200}
                      height={200}
                      style={{ cursor: "pointer" }}
                    />
                  </a>
                </div>
                <div className="qr-code-item">
                  <h3>Passenger App</h3>
                  <a
                    href={qrLinks.passenger}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={qrImages.passenger}
                      alt="Passenger QR Code"
                      width={200}
                      height={200}
                      style={{ cursor: "pointer" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
