import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiEye } from 'react-icons/fi';
import '../../styles/components/product-card.css';

function ProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const { _id, name, price, salePrice, discount, averageRating, images } = product;

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking quick view
    onQuickView();
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        {images && <img src={`http://localhost:5000/uploads/products/${images[0]}`} alt={name} className="product-image" />}
        {discount && (
          <span className="discount-badge">
            {discount}% OFF
          </span>
        )}
        <div className="rating">
          <FiStar className="star-icon" />
          <span>{averageRating}</span>
        </div>
        <button className="quick-view-btn" onClick={handleQuickView}>
          <FiEye />
          Quick View
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <div className="price-container">
          <span className="current-price">₹{price}</span>
          {salePrice && (
            <span className="original-price">₹{salePrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;