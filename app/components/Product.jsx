import React from "react";
import "../styles/Product.css";

const products = [
    {
        id: 1,
        name: "Sakay Helmet",
        description: "Ride safe with the official Sakay helmet.",
        price: "₱580.00",
        image: "/helmet.png",
        alt: "Sakay Helmet",
    },
    {
        id: 2,
        name: "Sakay Longsleeve",
        description: "Comfortable longsleeve designed for everyday riders.",
        price: "₱180.00",
        image: "/longsleeve.png",
        alt: "Sakay Longsleeve",
    },
];

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
                                <img
                                    src={product.image}
                                    alt={product.alt}
                                    className="product-image"
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
