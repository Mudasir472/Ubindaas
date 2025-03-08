import { FiX, FiStar, FiHeart, FiShoppingBag } from 'react-icons/fi';
import '../../styles/components/quick-view.css';
import axios from 'axios';
import { useState } from 'react'

function QuickView({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

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
  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem = {
      id: `${product.id}-${selectedSize}`,
      name: product.title,
      brand: product.brand,
      price: product.price,
      image: product?.image,
      size: selectedSize,
      quantity: quantity,
      maxQuantity: 10
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
      const newQuantity = cart[existingItemIndex].quantity + quantity;
      if (newQuantity <= 10) {
        cart[existingItemIndex].quantity = newQuantity;
      } else {
        alert('Maximum quantity limit reached for this item');
        return;
      }
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
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
                  <button key={size} onClick={() => setSelectedSize(size)} className="size-btn1">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="action-buttons1">
              <button onClick={addToCart} className="add-to-cart1">
                <FiShoppingBag />
                {isAddedToCart ? 'Added!' : 'Add to Cart'}
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