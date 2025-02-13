import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiStar, FiHeart, FiMinus, FiPlus, FiTruck, FiRefreshCcw, FiCheck, FiX } from 'react-icons/fi';
import { Volume2, VolumeX, X } from 'lucide-react';
import SizeGuideModal from '../components/product/SizeGuideModal';
import RelatedProducts from '../components/product/RelatedProducts';
import '../styles/pages/product-details.css';
import Footer from '../components/layout/Footer';

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
  const [isMuted, setIsMuted] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);

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

{/* WhatsApp Chat Button */}
<a 
  href={`https://wa.me/+919876543210?text=Hi, I'm interested in ${product.title} (₹${product.price})`} 
  target="_blank" 
  rel="noopener noreferrer"
  className="whatsapp-btn"
>
  <img src="data:image/jpeg;base64,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" alt="WhatsApp" />
  Chat on WhatsApp
</a>
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
      <Footer/>
      
      {/* Product Video Player */}
      <div className={`product-video-player ${!isMinimized ? 'expanded' : ''}`}>
        <div className="video-container">
          <video 
            src="/api/placeholder/400/320"
            autoPlay
            loop
            muted={isMuted}
            className="video-element"
          />
          
          <div className="video-controls">
            <div className="video-title">Elegance in...</div>
            <div className="control-buttons">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="control-btn"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="control-btn"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;