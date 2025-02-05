import { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import QuickView from './QuickView';
import '../../styles/components/product-card.css';

function ProductCard({ product }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const { id, title, price, originalPrice, discount, rating, image } = product;

  return (
    <>
      <div className="product-card">
        <div 
          className="product-image-container"
          onClick={() => setShowQuickView(true)}
        >
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
          <button className="quick-view-btn">Quick View</button>
        </div>
        <Link to={`/product/${id}`} className="product-info">
          <h3 className="product-title">{title}</h3>
          <div className="price-container">
            <span className="current-price">₹{price}</span>
            {originalPrice && (
              <span className="original-price">₹{originalPrice}</span>
            )}
          </div>
        </Link>
      </div>

      {showQuickView && (
        <QuickView 
          product={product} 
          onClose={() => setShowQuickView(false)} 
        />
      )}
    </>
  );
}

export default ProductCard;