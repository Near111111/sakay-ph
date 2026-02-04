"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import "../styles/AppleAndPlayStoreButton.css";

export default function AppleAndPlayStoreButton() {
  const [showModal, setShowModal] = useState(false);
  const [qrImages, setQrImages] = useState({ driver: "", passenger: "" });
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
    setModalTitle("Google Play Store");
    setShowModal(true);
  };

  const handleAppStoreClick = () => {
    setQrImages({
      driver: "/qr_pictures/ios_driver_qr.png",
      passenger: "/qr_pictures/ios_passenger_qr.png",
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
                  <Image
                    src={qrImages.driver}
                    alt="Driver QR Code"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="qr-code-item">
                  <h3>Passenger App</h3>
                  <Image
                    src={qrImages.passenger}
                    alt="Passenger QR Code"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
