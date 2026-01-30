"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../styles/Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          {["HOME", "JOIN US", "ABOUT US"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={
                  item === "HOME"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="navbar-link"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.span>
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/get-app" className="navbar-cta-button">
              <span>Get the app</span>
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
            </Link>
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
          {["HOME", "JOIN US", "ABOUT US"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={
                  item === "HOME"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="mobile-menu-link"
                onClick={toggleMobileMenu}
              >
                {item}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/get-app"
              className="mobile-cta-button"
              onClick={toggleMobileMenu}
            >
              Get the app
            </Link>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
}
