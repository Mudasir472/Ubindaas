// src/pages/ProductDetails.js
import React, { useState } from 'react';
import { Heart, Minus, Plus, Share2, Star, Truck, X } from 'lucide-react';
import RelatedProducts from '../components/product/RelatedProducts';
import { Link } from 'react-router-dom';
import "../styles/pages/product-details.css";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Mock Product Data
  const product = {
    id: 1,
    brand: "Libas",
    title: "Pink Embroidered Kurta",
    price: 799,
    originalPrice: 1999,
    discount: 60,
    rating: 4.2,
    ratingCount: 128,
    description: "Pink embroidered kurta with straight fit and three-quarter sleeves.",
    details: [
      "Material: Cotton",
      "Length: Calf Length",
      "Pattern: Embroidered",
      "Style: Casual",
      "Care: Machine wash"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700",
      "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700",
      "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700"
    ]
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
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
      image: product.images[0],
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

  const buyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart();
    // Navigate to cart page
    window.location.href = '/cart';
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index}
        className={index < Math.floor(rating) ? 'star filled' : 'star'}
      />
    ));
  };

  return (
    <div className="product-details">
      <div className="product-container">
        {/* Left Column - Images */}
        <div className="product-gallery">
          <div className="thumbnails-container">
            {product.images.map((img, idx) => (
              <div 
                key={idx}
                className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img} alt={`Product view ${idx + 1}`} />
              </div>
            ))}
          </div>
          <div className="main-image-container" onClick={() => setIsModalOpen(true)}>
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="main-image"
            />
            <span className="zoom-hint">Click to zoom</span>
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="product-info">
          <div className="brand-title">
            <h2 className="brand">{product.brand}</h2>
            <h1 className="title">{product.title}</h1>
          </div>

          <div className="rating">
            <div className="stars">
              {renderStars(product.rating)}
              <span className="rating-number">{product.rating}</span>
            </div>
            <span className="rating-count">({product.ratingCount} Reviews)</span>
          </div>

          <div className="price-section">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount">({product.discount}% OFF)</span>
          </div>

          <div className="size-section">
            <div className="size-header">
              <h3>Select Size</h3>
              <button className="size-guide">Size Guide</button>
            </div>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-selector">
            <span>Quantity:</span>
            <div className="quantity-controls">
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="delivery-check">
            <div className="pincode-input">
              <input
                type="text"
                placeholder="Enter PIN Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
              <button>Check</button>
            </div>
            {pincode.length === 6 && (
              <div className="delivery-status">
                <Truck size={16} />
                <p>Expected delivery by 27 Feb</p>
              </div>
            )}
          </div>

          <div className="actions">
            <button className="buy-now" onClick={buyNow}>
              Buy Now
            </button>
            <button className="add-to-bag" onClick={addToCart}>
              {isAddedToCart ? 'Added!' : 'Add to Bag'}
            </button>
          </div>

          <button className="wishlist-button">
            <Heart size={18} />
            WISHLIST
          </button>

          <div className="product-description">
            <h3>Product Details</h3>
            <p>{product.description}</p>
            <ul>
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="image-modal">
          <button className="close-modal" onClick={() => setIsModalOpen(false)}>
            <X size={24} />
          </button>
          <div className="modal-content">
            <img src={product.images[selectedImage]} alt={product.title} />
          </div>
        </div>
      )}

      {/* Related Products */}
      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;