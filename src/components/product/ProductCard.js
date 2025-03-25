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
    <div className="product-cards" style={{ cursor: 'pointer' }} onClick={handleClick}>
      <div className="product-image-containerr">
        {images && <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/products/${images[0]}`} alt={name} className="product-image" />}
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
        <p className="product-title">{name}</p>
        <div className="price-container">
          <span className="current-price">₹{salePrice}</span>
          {price && (
            <span className="original-price">₹{price}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;