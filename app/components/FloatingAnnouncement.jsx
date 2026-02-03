"use client";

import { useEffect, useState } from "react";
import "../styles/FloatingAnnouncement.css";

export default function FloatingAnnouncement() {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const announcements = [
    {
      id: 1,
      title: "New Service Launch!",
      date: "Feb 12, 2026",
      message: "Motorcade/on-boarding event!",
    },
    {
      id: 2,
      title: "Promo Alert! 🎉",
      date: "P30 DISCOUNT!",
      message: "USE CODE: SAKAYNA30",
    },
    {
      id: 3,
      title: "Podcast 🎙️",
      date: "Feb 4, 2026",
      message: "Podcast with Sir Argel!",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if user scrolled past the hero section (adjust this value based on your layout)
      const gallerySection = document.querySelector("section:has(h3)"); // Gallery section
      if (gallerySection) {
        const galleryPosition = gallerySection.getBoundingClientRect().top;
        setIsVisible(galleryPosition <= window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Icon (when closed) */}
      {!isOpen && (
        <div className="floating-icon" onClick={handleOpen}>
          <span className="icon-badge">3</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Floating Announcement Card (when open) */}
      {isOpen && (
        <div className="floating-announcement">
          <div className="announcement-header">
            <h3 className="announcement-title">📢 Announcements</h3>
            <button className="close-button" onClick={handleClose}>
              ✕
            </button>
          </div>

          <div className="announcements-list">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="announcement-item">
                <h4 className="item-title">{announcement.title}</h4>
                <p className="item-date">{announcement.date}</p>
                <p className="item-message">{announcement.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
