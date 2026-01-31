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
  const dropdownRef = useRef(null);
  const { scrollY } = useScroll();

  // Navigation items with custom routes
  const navItems = [
    { label: "HOME", href: "/" },
    { label: "JOIN US", href: "/join-us" },
    { label: "ABOUT US", href: "/Aboutus" },
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAppDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAppDropdown = () => {
    setIsAppDropdownOpen(!isAppDropdownOpen);
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
        <Link href="/" className="navbar-logo-link">
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
        </Link>

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
                <Link
                  href="/get-app/driver"
                  className="app-dropdown-item"
                  onClick={() => setIsAppDropdownOpen(false)}
                >
                  <div className="dropdown-item-icon">🚗</div>
                  <div>
                    <div className="dropdown-item-title">Be a Driver</div>
                    <div className="dropdown-item-subtitle">
                      Start earning with Sakay
                    </div>
                  </div>
                </Link>
                <Link
                  href="/get-app/passenger"
                  className="app-dropdown-item"
                  onClick={() => setIsAppDropdownOpen(false)}
                >
                  <div className="dropdown-item-icon">👤</div>
                  <div>
                    <div className="dropdown-item-title">Be a Passenger</div>
                    <div className="dropdown-item-subtitle">
                      Book your ride now
                    </div>
                  </div>
                </Link>
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

          {/* Mobile Get the app options */}
          <motion.div
            className="mobile-app-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mobile-app-title">Get the app</div>
            <Link
              href="/get-app/driver"
              className="mobile-cta-button"
              onClick={toggleMobileMenu}
            >
              🚗 Be a Driver
            </Link>
            <Link
              href="/get-app/passenger"
              className="mobile-cta-button mobile-cta-button-secondary"
              onClick={toggleMobileMenu}
            >
              👤 Be a Passenger
            </Link>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
}
