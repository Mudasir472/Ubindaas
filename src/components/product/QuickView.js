import { FiX, FiStar, FiHeart, FiShoppingBag } from 'react-icons/fi';
import '../../styles/components/quick-view.css';
import axios from 'axios';
import { useState } from 'react'

function QuickView({ product, onClose }) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  const [isWishlisted, setIsWishlisted] = useState(false);
  if (!product) return null;
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const { title, price, originalPrice, discount, rating, image } = product;


  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customer/wishlist",
        { productId: product._id, userid: user._id },
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.response?.data || error);
    }
  };

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>

        <div className="quick-view-content">
          <div className="product-image1">
            <img src={image} alt={title} />
            {discount && (
              <span className="discount-badge1">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="product-details1">
            <h2 className="product-title">{title}</h2>

            <div className="rating-container1">
              <FiStar className="star-icon1" />
              <span>{rating}</span>
            </div>

            <div className="price-container1">
              <span className="current-price1">₹{price}</span>
              {originalPrice && (
                <span className="original-price1">₹{originalPrice}</span>
              )}
              {discount && (
                <span className="discount-text1">{discount}% OFF</span>
              )}
            </div>

            <div className="size-section1">
              <h3>Select Size</h3>
              <div className="size-buttons1">
                {sizes.map(size => (
                  <button key={size} className="size-btn1">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="action-buttons1">
              <button className="add-to-cart1">
                <FiShoppingBag />
                Add to Cart
              </button>
              <button onClick={handleAddToWishlist} className="wishlist1" >
                <FiHeart />
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;