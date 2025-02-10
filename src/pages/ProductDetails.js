import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiStar, FiHeart, FiMinus, FiPlus, FiTruck, FiRefreshCcw } from 'react-icons/fi';
import '../styles/pages/product-details.css';

function ProductDetails() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Mock Data
  const product = {
    id: 1,
    title: "DENIM BUSTIER TOP",
    price: 999,
    originalPrice: 2699,
    discount: 63,
    rating: 4.75,
    description: "A stylish denim bustier top perfect for any occasion. Made with premium quality denim fabric.",
    details: [
      "Material: 100% Cotton Denim",
      "Wash Care: Machine wash cold",
      "Fit Type: Regular fit",
      "Pattern: Solid",
      "Style: Casual"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
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
    // Add to cart logic here
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="product-details">
      <div className="product-container">
        {/* Images Section */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.title} />
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
            <FiStar className="star-icon" />
            <span>{product.rating}</span>
          </div>

          <div className="price">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount">{product.discount}% OFF</span>
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
              <button onClick={decreaseQuantity}>
                <FiMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
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
              <button 
                className={activeTab === 'description' ? 'active' : ''}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={activeTab === 'details' ? 'active' : ''}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;