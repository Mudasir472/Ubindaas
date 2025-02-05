import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../../styles/components/product-card.css';

function ProductCard({ product }) {
  const { id, title, price, originalPrice, discount, rating, image } = product;

  return (
    <Link to={`/product/${id}`} className="product-card">
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
    </Link>
  );
}

export default ProductCard;