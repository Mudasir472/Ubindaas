import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiEye } from 'react-icons/fi';
import '../../styles/components/product-card.css';

function ProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const { id, title, price, originalPrice, discount, rating, image } = product;

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking quick view
    onQuickView();
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
        {discount && (
          <span className="discount-badge">
            {discount}% OFF
          </span>
        )}
        <div className="rating">
          <FiStar className="star-icon" />
          <span>{rating}</span>
        </div>
        <button className="quick-view-btn" onClick={handleQuickView}>
          <FiEye />
          Quick View
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="price-container">
          <span className="current-price">₹{price}</span>
          {originalPrice && (
            <span className="original-price">₹{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;