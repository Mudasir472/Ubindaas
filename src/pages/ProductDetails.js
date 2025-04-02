// src/pages/ProductDetails.js

import React, { useEffect, useState } from 'react';
import { Heart, Minus, Plus, Share2, Star, Truck, X } from 'lucide-react';
import RelatedProducts from '../components/product/RelatedProducts';
import FeaturedProducts from "../components/product/FeaturedProducts"
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import "../styles/pages/product-details.css";
import Reviews from './Reviews';
import { Modal, Button } from "react-bootstrap";


const ProductDetails = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([]);
  const [currProduct, setCurrProduct] = useState([]);
  const [isVideoOpen, setIsVideoOpen] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // count discount percentage
  const discountPercentage = ((currProduct?.price - currProduct?.salePrice) / currProduct?.price) * 100;
  const handleAddToWishlist = async (currProduct) => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/customer/wishlist`,
        { productId: currProduct._id }, // Request payload (body)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.response?.data || error);
    }
  };
  useEffect(() => {
    const currProduct = Array.isArray(products) && products.find((item) => item._id === id);
    setCurrProduct(currProduct);
  }, [products, id]);


  const fetchProducts = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
      setProducts(resp?.data?.data?.products);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])



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

    if (!currProduct?.sizes?.includes(selectedSize)) {
      alert('Selected size is out of stock');
      return;
    }
    if (currProduct?.stock <= 0) {
      alert('Item is out of stock');
      return;
    }


    const cartItem = {
      _id: currProduct._id,
      name: currProduct?.name,
      price: currProduct?.price,
      image: currProduct?.images[0],
      salePrice: currProduct?.salePrice,
      size: selectedSize,
      quantity: quantity,
      stock: currProduct?.stock,
      maxQuantity: 10
    };


    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex(item => item._id === cartItem.id);

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

  // Rating here to display
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ratings/product/${currProduct?._id}`);
        setRatings(response.data.data);

      } catch (err) {
        console.log(err);
        // setError("Error fetching ratings");
      }
    };

    // now we can display reviews of current product on frontend
    if (currProduct?._id) fetchRatings();
  }, [currProduct?._id]);

  // whatsapp num and message
  const message = `💎 Hello! I'm interested in this stunning piece from your collection. Could you share more details, including pricing, customization options, and availability? Looking forward to your response!`
  const number = "+916006189840"

  return (
    <div className="product-details">
      <div className="product-container">
        {/* Left Column - Images */}
        <div className="product-gallery">
          <div className="thumbnails-container">
            {Array.isArray(currProduct?.images) && currProduct?.images?.map((img, idx) => (
              <div
                key={idx}
                className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/products/${img}`} alt={`Product view ${idx + 1}`} />
              </div>
            ))}
          </div>
          <div className="main-image-container" >
            <img onClick={() => setIsModalOpen(true)}
              style={{ borderRadius: '12px' }}
              src={currProduct?.images?.[0] ? `${process.env.REACT_APP_API_BASE_URL}/uploads/products/${currProduct.images[0]}` : "fallback-image.jpg"}
              alt={currProduct?.name || "Product Image"}
              className="main-image "
            />
            <span className="zoom-hint">Click img to zoom</span>
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="product-info">
          <div className="brand-title">
            <h2 className="brand">{currProduct?.slug}</h2>
          </div>

          <div className="ratings d-flex align-items-center gap-3 border-bottom pb-3">
            <div className="stars">
              {renderStars(currProduct?.ratingCount)}
            </div>
            <div>
              <span className="rating-number">{currProduct?.ratingCount}</span>
              <span className="rating-count">({currProduct?.ratingCount} Reviews)</span>
            </div>
          </div>

          <div className="price-section">
            <span className="current-price">₹{currProduct?.salePrice}</span>
            <span className="original-price">₹{currProduct?.price}</span>
            <span style={{
                fontsize:'5px',

              backgroundColor: '#0e6efd',
              color: 'white',
              padding:'1px',
              borderRadius:'6px 2px'
            }} className="discount">{discountPercentage && `${discountPercentage.toFixed(0)} % OFF`}</span>
          </div>

          <div className="size-section">
            <div className="size-header">
              <h3>Select Size</h3>
              <button className="size-guide">Size Guide</button>
            </div>
            <div className="size-options">
              {currProduct?.sizes?.map((size) => (
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

          <div className="quantity-selector ps-4">
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
              <div className="delivery-status d-flex align-items-center">
                <Truck size={16} />
                <span>Expected delivery by 27 Feb</span>
              </div>
            )}
          </div>

          <div className="actions">
            <button className="buy-now bg-[black]" onClick={buyNow}>
              Buy Now
            </button>
            <button className="add-to-bag" onClick={addToCart}>
              {isAddedToCart ? 'Added!' : 'Add to Bag'}
            </button>
          </div>

          <button onClick={() => { handleAddToWishlist(currProduct) }} className="wishlist-button">
            <Heart size={18} />
            {isWishlisted ? 'WISHLISHED' : 'WISHLISH'}
          </button>
          {isVideoOpen && (
            <div className="position-relative d-flex align-items-center justify-content-end" >
              {currProduct?.video && (
                <video
                  style={{ height: '123px', cursor: 'pointer' }}
                  className="img-fluid rounded border left-0"
                  autoPlay
                  muted
                  loop
                >
                  <source src={`${process.env.REACT_APP_API_BASE_URL}/uploads/videos/${currProduct.video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}

          <div className="product-description">
            <h3 className='text-bold'>Product Details</h3>
            <p>{currProduct?.description}</p>
            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${number}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success d-flex align-items-center justify-content-center gap-2 fw-bold px-4 py-2 rounded shadow-lg text-white"
              style={{ width: '16rem', fontSize: '1.1rem', transition: '0.3s ease-in-out' }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <i className="bi bi-whatsapp fs-4"></i>
              Chat on WhatsApp
            </a>

            {/* <ul>
              {products?.details?.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul> */}
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
            <img src={currProduct?.images?.[0] ? `${process.env.REACT_APP_API_BASE_URL}/uploads/products/${currProduct.images[0]}` : "fallback-image.jpg"} alt={currProduct?.name} />
          </div>
        </div>
      )}

      {/* Related Products */}

      <FeaturedProducts />
      <div>
        <div>
          <h2>Review Section</h2>
          <div>
            <div>
              {ratings?.length > 0 ? (
                ratings?.map((review) => (
                  <div key={review?._id} className="p-4 border-b">
                    <h3 className="font-semibold">{review?.userId?.name}</h3>
                    <p className="text-yellow-500">Rating: {review.rating} ⭐</p>
                    <p className="text-gray-600">{review.review || "No review provided."}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
          <Reviews id={currProduct?._id} />
        </div>

      </div>

    </div>

  );
};

export default ProductDetails;