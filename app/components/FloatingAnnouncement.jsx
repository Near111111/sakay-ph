"use client";

import { useEffect, useState } from "react";
import "../styles/FloatingAnnouncement.css";

export default function FloatingAnnouncement() {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const announcements = [
    {
      id: 1,
      title: "New Service Launch! 🚗",
      date: "Feb 12, 2026",
      message: "Motorcade/on-boarding event!",
    },
    {
      id: 2,
      title: "Promo Alert! 🎉",
      date: "NO INFO.",
      message: "No promo yet",
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
          📢
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
