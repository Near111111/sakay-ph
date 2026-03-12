"use client";
import React, { useState } from "react";
import "../styles/Product.css";

const products = [
    {
        id: 1,
        name: "Sakay Helmet",
        description: "Ride safe with the official Sakay helmet.",
        price: "₱580.00",
        images: ["fronthelmet.jpg", "frontleft.jpg", "backleft.jpg", "backhelmet.jpg", "righthelmet.jpg"],
        alt: "Sakay Helmet",
    },
    {
        id: 2,
        name: "Sakay Longsleeve",
        description: "Comfortable longsleeve designed for everyday riders.",
        price: "₱180.00",
        images: ["front.jpg", "left.jpg", "back.jpg", "rightback.jpg", "right.jpg"],
        alt: "Sakay Longsleeve",
    },
];

const ProductCarousel = ({ images, alt }) => {
    const [current, setCurrent] = useState(0);

    const prev = () =>
        setCurrent((c) => (c - 1 + images.length) % images.length);
    const next = () =>
        setCurrent((c) => (c + 1) % images.length);

    return (
        <div className="product-carousel">
            <div className="product-carousel-track">
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`${alt} view ${i + 1}`}
                        className={`product-carousel-img ${i === current ? "active" : ""}`}
                    />
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <button
                        className="carousel-btn carousel-btn--prev"
                        onClick={prev}
                        aria-label="Previous image"
                    >
                        ‹
                    </button>
                    <button
                        className="carousel-btn carousel-btn--next"
                        onClick={next}
                        aria-label="Next image"
                    >
                        ›
                    </button>

                    <div className="carousel-dots">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                className={`carousel-dot ${i === current ? "active" : ""}`}
                                onClick={() => setCurrent(i)}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const Product = () => {
    return (
        <section className="product-section">
            {/* Decorative background blobs */}
            <div className="product-bg-blob product-bg-blob--tl" />
            <div className="product-bg-blob product-bg-blob--br" />

            {/* Grid pattern overlay */}
            <div className="product-grid-overlay" aria-hidden="true" />

            <div className="product-inner">
                {/* Header */}
                <div className="product-header">
                    <h2 className="product-title">
                        Gear up and Ride with{" "}
                        <img
                            src="/sakaylogo.png"
                            alt="Sakay"
                            className="product-title-logo"
                        />
                    </h2>
                    <p className="product-subtitle">
                        Official gear for riders and supporters.
                    </p>
                </div>

                {/* Cards */}
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-wrapper">
                                <ProductCarousel
                                    images={product.images}
                                    alt={product.alt}
                                />
                            </div>
                            <div className="product-info">
                                <div className="product-info-top">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                </div>
                                <div className="product-info-bottom">
                                    <span className="product-price">{product.price}</span>
                                    <button className="product-btn">Order Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Product;
