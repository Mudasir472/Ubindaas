import { FiX, FiStar, FiHeart, FiShoppingBag } from 'react-icons/fi';
import '../../styles/components/quick-view.css';

function QuickView({ product, onClose }) {
  if (!product) return null;
  
  const { title, price, originalPrice, discount, rating, image } = product;
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>
        
        <div className="quick-view-content">
          <div className="product-image">
            <img src={image} alt={title} />
            {discount && (
              <span className="discount-badge">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="product-details">
            <h2 className="product-title">{title}</h2>
            
            <div className="rating-container">
              <FiStar className="star-icon" />
              <span>{rating}</span>
            </div>

            <div className="price-container">
              <span className="current-price">₹{price}</span>
              {originalPrice && (
                <span className="original-price">₹{originalPrice}</span>
              )}
              {discount && (
                <span className="discount-text">{discount}% OFF</span>
              )}
            </div>

            <div className="size-section">
              <h3>Select Size</h3>
              <div className="size-buttons">
                {sizes.map(size => (
                  <button key={size} className="size-btn">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart">
                <FiShoppingBag />
                Add to Cart
              </button>
              <button className="wishlist">
                <FiHeart />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;