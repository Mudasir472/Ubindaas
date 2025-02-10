import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiStar, FiHeart, FiMinus, FiPlus, FiTruck, FiRefreshCcw, FiCheck, FiX } from 'react-icons/fi';
import SizeGuideModal from '../components/product/SizeGuideModal';
import RelatedProducts from '../components/product/RelatedProducts';
import '../styles/pages/product-details.css';

function ProductDetails() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Mock Product Data
  const product = {
    id: 1,
    title: "DENIM BUSTIER TOP",
    price: 999,
    originalPrice: 2699,
    discount: 63,
    rating: 4.75,
    ratingCount: 128,
    description: "A stylish denim bustier top perfect for any occasion. Made with premium quality denim fabric.",
    details: [
      "Material: 100% Cotton Denim",
      "Wash Care: Machine wash cold",
      "Fit Type: Regular fit",
      "Pattern: Solid",
      "Style: Casual"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Dark Blue', code: '#1a237e' },
      { name: 'Light Blue', code: '#1976d2' },
      { name: 'Black', code: '#212121' }
    ],
    images: [
      "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700",
      "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700",
      "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700"
    ]
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }
    setIsAddingToCart(true);
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      // Add your cart logic here
    }, 1000);
  };

  const checkDelivery = () => {
    if (pincode.length !== 6) {
      alert('Please enter a valid pincode');
      return;
    }
    // Mock delivery check
    setTimeout(() => {
      setDeliveryStatus({
        available: true,
        days: '3-5',
        cod: true
      });
    }, 500);
  };

  return (
    <div className="product-details">
      <div className="product-container">
        {/* Images Section */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.title} />
            <span className="discount-badge">-{product.discount}%</span>
          </div>
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.title} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <h1>{product.title}</h1>
          
          <div className="rating">
            <div className="stars">
              <FiStar className="star-icon" />
              <span>{product.rating}</span>
            </div>
            <span className="rating-count">({product.ratingCount} reviews)</span>
          </div>

          <div className="price">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount">{product.discount}% OFF</span>
          </div>

          {/* Color Selection */}
          <div className="color-section">
            <h3>Select Color</h3>
            <div className="color-options">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  className={`color-btn ${selectedColor === color.name ? 'selected' : ''}`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="size-section">
            <div className="size-header">
              <h3>Select Size</h3>
              <button 
                className="size-guide"
                onClick={() => setSizeGuideOpen(true)}
              >
                Size Guide
              </button>
            </div>
            <div className="size-options">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="quantity-section">
            <span>Quantity</span>
            <div className="quantity-selector">
              <button 
                onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                disabled={quantity === 1}
              >
                <FiMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Delivery Check */}
          <div className="delivery-check">
            <div className="pincode-input">
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
              <button onClick={checkDelivery}>Check</button>
            </div>
            {deliveryStatus && (
              <div className="delivery-status">
                {deliveryStatus.available ? (
                  <>
                    <FiCheck className="success" />
                    <p>Delivery available in {deliveryStatus.days} days</p>
                    {deliveryStatus.cod && <span className="cod">Cash on Delivery available</span>}
                  </>
                ) : (
                  <>
                    <FiX className="error" />
                    <p>Delivery not available in your area</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button 
              className={`add-to-cart ${isAddingToCart ? 'loading' : ''}`}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
            <button className="wishlist">
              <FiHeart />
              Wishlist
            </button>
          </div>

          {/* Delivery Features */}
          <div className="delivery-features">
            <div className="feature">
              <FiTruck />
              <div>
                <h4>Free Delivery</h4>
                <p>On orders above ₹999</p>
              </div>
            </div>
            <div className="feature">
              <FiRefreshCcw />
              <div>
                <h4>Easy Returns</h4>
                <p>7-day return policy</p>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="product-tabs">
            <div className="tab-buttons">
              {['description', 'details', 'reviews'].map(tab => (
                <button 
                  key={tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="description">
                  <p>{product.description}</p>
                </div>
              )}
              {activeTab === 'details' && (
                <div className="details">
                  <ul>
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="reviews">
                  {/* Add reviews content */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal 
        isOpen={isSizeGuideOpen} 
        onClose={() => setSizeGuideOpen(false)} 
      />

      {/* Related Products */}
      <RelatedProducts currentProductId={parseInt(id)} />
    </div>
  );
}

export default ProductDetails;