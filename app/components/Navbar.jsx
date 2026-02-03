"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../styles/Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(false);
  const [isDriverStoreOpen, setIsDriverStoreOpen] = useState(false);
  const [isPassengerStoreOpen, setIsPassengerStoreOpen] = useState(false);
  const [isMobileAppDropdownOpen, setIsMobileAppDropdownOpen] = useState(false);
  const [isMobileDriverOpen, setIsMobileDriverOpen] = useState(false);
  const [isMobilePassengerOpen, setIsMobilePassengerOpen] = useState(false);
  const dropdownRef = useRef(null);
  const driverStoreRef = useRef(null);
  const passengerStoreRef = useRef(null);
  const { scrollY } = useScroll();

  // Navigation items with custom routes
  const navItems = [
    { label: "HOME", href: "/" },
    { label: "JOIN US", href: "/join-us" },
    { label: "ABOUT US", href: "/about-us" },
  ];

  // Keep it white always
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.98)"],
  );

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock/unlock body scroll when mobile menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
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
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAppDropdownOpen(false);
      }
      if (
        driverStoreRef.current &&
        !driverStoreRef.current.contains(event.target)
      ) {
        setIsDriverStoreOpen(false);
      }
      if (
        passengerStoreRef.current &&
        !passengerStoreRef.current.contains(event.target)
      ) {
        setIsPassengerStoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Reset all mobile dropdowns when closing menu
    if (isMobileMenuOpen) {
      setIsMobileAppDropdownOpen(false);
      setIsMobileDriverOpen(false);
      setIsMobilePassengerOpen(false);
    }
  };

  const toggleAppDropdown = () => {
    setIsAppDropdownOpen(!isAppDropdownOpen);
  };

  const toggleDriverStore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDriverStoreOpen(!isDriverStoreOpen);
    setIsPassengerStoreOpen(false);
  };

  const togglePassengerStore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPassengerStoreOpen(!isPassengerStoreOpen);
    setIsDriverStoreOpen(false);
  };

  const toggleMobileAppDropdown = () => {
    setIsMobileAppDropdownOpen(!isMobileAppDropdownOpen);
    // Close driver and passenger when closing main dropdown
    if (isMobileAppDropdownOpen) {
      setIsMobileDriverOpen(false);
      setIsMobilePassengerOpen(false);
    }
  };

  const toggleMobileDriver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileDriverOpen(!isMobileDriverOpen);
    setIsMobilePassengerOpen(false);
  };

  const toggleMobilePassenger = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobilePassengerOpen(!isMobilePassengerOpen);
    setIsMobileDriverOpen(false);
  };

  return (
    <motion.nav
      className="navbar"
      style={{
        backgroundColor: navbarBg,
      }}
    >
      {/* Animated rainbow border - appears on scroll */}
      <motion.div
        className="navbar-rainbow-border"
        style={{ opacity: borderOpacity }}
      />

      <div className="navbar-container">
        <div className="navbar-logo-link" onClick={scrollToTop}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Image
              src="/sakay_logo.jpg"
              alt="Sakay PH Logo"
              width={40}
              height={40}
              className="navbar-logo-image"
            />
          </motion.div>
          <motion.span
            className="navbar-logo-text"
            whileHover={{ color: "#4e2780" }}
          >
            SAKAY-PH
          </motion.span>
        </div>

        <div className="navbar-menu">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href} className="navbar-link">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.span>
              </Link>
            </motion.div>
          ))}

          {/* Get the app dropdown */}
          <motion.div
            ref={dropdownRef}
            className="app-dropdown-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="navbar-cta-button"
              onClick={toggleAppDropdown}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get the app</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ marginLeft: "8px" }}
                animate={{ rotate: isAppDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
              <motion.span
                className="cta-shine"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                  repeatDelay: 3,
                }}
              />
            </motion.button>

            {/* Dropdown Menu */}
            {isAppDropdownOpen && (
              <motion.div
                className="app-dropdown-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Driver Option */}
                <div ref={driverStoreRef} className="store-option-wrapper">
                  <div
                    className="app-dropdown-item"
                    onClick={toggleDriverStore}
                  >
                    <div className="dropdown-item-icon">🚗</div>
                    <div style={{ flex: 1 }}>
                      <div className="dropdown-item-title">Be a Driver</div>
                      <div className="dropdown-item-subtitle">
                        Start earning with Sakay
                      </div>
                    </div>
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      animate={{ rotate: isDriverStoreOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ marginLeft: "8px" }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </div>

                  {/* Driver Store Options */}
                  {isDriverStoreOpen && (
                    <motion.div
                      className="store-submenu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href="https://apps.apple.com/ph/app/sakayph-drivers/id6755422440"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="store-link"
                        onClick={() => {
                          setIsAppDropdownOpen(false);
                          setIsDriverStoreOpen(false);
                        }}
                      >
                        <div className="store-icon">🍎</div>
                        <span>App Store</span>
                      </Link>
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.algovision.sakay_driver&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="store-link"
                        onClick={() => {
                          setIsAppDropdownOpen(false);
                          setIsDriverStoreOpen(false);
                        }}
                      >
                        <div className="store-icon">📱</div>
                        <span>Play Store</span>
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Passenger Option */}
                <div ref={passengerStoreRef} className="store-option-wrapper">
                  <div
                    className="app-dropdown-item"
                    onClick={togglePassengerStore}
                  >
                    <div className="dropdown-item-icon">👤</div>
                    <div style={{ flex: 1 }}>
                      <div className="dropdown-item-title">Be a Passenger</div>
                      <div className="dropdown-item-subtitle">
                        Book your ride now
                      </div>
                    </div>
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      animate={{ rotate: isPassengerStoreOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ marginLeft: "8px" }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </div>

                  {/* Passenger Store Options */}
                  {isPassengerStoreOpen && (
                    <motion.div
                      className="store-submenu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href="https://apps.apple.com/ph/app/sakayph/id6755413428"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="store-link"
                        onClick={() => {
                          setIsAppDropdownOpen(false);
                          setIsPassengerStoreOpen(false);
                        }}
                      >
                        <div className="store-icon">🍎</div>
                        <span>App Store</span>
                      </Link>
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.algovision.sakay_passengers&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="store-link"
                        onClick={() => {
                          setIsAppDropdownOpen(false);
                          setIsPassengerStoreOpen(false);
                        }}
                      >
                        <div className="store-icon">📱</div>
                        <span>Play Store</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <motion.span
            className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
            animate={isMobileMenuOpen ? "open" : "closed"}
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="mobile-menu-link"
                onClick={toggleMobileMenu}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          {/* Mobile Get the app section with collapsible functionality */}
          <motion.div
            className="mobile-app-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="mobile-app-toggle"
              onClick={toggleMobileAppDropdown}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get the app</span>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                animate={{ rotate: isMobileAppDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>

            {/* Show app options only when dropdown is open */}
            {isMobileAppDropdownOpen && (
              <motion.div
                className="mobile-app-options"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Driver Section */}
                <div className="mobile-store-section">
                  <motion.div
                    className="mobile-option-header"
                    onClick={toggleMobileDriver}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="mobile-option-content">
                      <div className="mobile-option-icon">🚗</div>
                      <div className="mobile-option-text">
                        <div className="mobile-option-title">Be a Driver</div>
                        <div className="mobile-option-subtitle">
                          Start earning with Sakay
                        </div>
                      </div>
                    </div>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      animate={{ rotate: isMobileDriverOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.div>

                  {isMobileDriverOpen && (
                    <motion.div
                      className="mobile-store-links"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href="https://apps.apple.com/ph/app/sakayph-drivers/id6755422440"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-cta-button"
                        onClick={toggleMobileMenu}
                      >
                        🍎 App Store
                      </Link>
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.algovision.sakay_driver&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-cta-button"
                        onClick={toggleMobileMenu}
                      >
                        📱 Play Store
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Passenger Section */}
                <div className="mobile-store-section">
                  <motion.div
                    className="mobile-option-header"
                    onClick={toggleMobilePassenger}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="mobile-option-content">
                      <div className="mobile-option-icon">👤</div>
                      <div className="mobile-option-text">
                        <div className="mobile-option-title">
                          Be a Passenger
                        </div>
                        <div className="mobile-option-subtitle">
                          Book your ride now
                        </div>
                      </div>
                    </div>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      animate={{ rotate: isMobilePassengerOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.div>

                  {isMobilePassengerOpen && (
                    <motion.div
                      className="mobile-store-links"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href="https://apps.apple.com/ph/app/sakayph/id6755413428"
                        target="_blank"
                        className="mobile-cta-button mobile-cta-button-secondary"
                        onClick={toggleMobileMenu}
                      >
                        🍎 App Store
                      </Link>
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.algovision.sakay_passengers&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-cta-button mobile-cta-button-secondary"
                        onClick={toggleMobileMenu}
                      >
                        📱 Play Store
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
}
