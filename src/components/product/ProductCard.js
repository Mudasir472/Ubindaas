import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiEye } from 'react-icons/fi';
import '../../styles/components/product-card.css';

function ProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const { _id, name, price, salePrice, discount, averageRating, images, totalDiscount } = product;

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
        {/* <button className="quick-view-btn" onClick={handleQuickView}>
          <FiEye />
          Quick View
        </button> */}
      </div>

      <div className="product-info">
        <p style={{ fontSize:'16px'}} className="product-title">{name}</p>
        <div style={{ gap: '12px' }} className="price-container">
          <span style={{ fontSize: '16px' }} className="current-price">₹{salePrice}</span>
          {price && (
            <span style={{ fontSize: '14px' }} className="original-price">₹{price}</span>
          )}
          {
            totalDiscount && (
              <span style={{ background: '#f36478', color: '#fff', padding: '0px 8px', borderRadius: '4px' }}>{`${totalDiscount} % Off`}</span>
            )
          }
        </div>

      </div>
    </div>
  );
}

export default ProductCard;