// src/pages/cart/index.js
import React, { useState, useEffect } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken");

  const handleCheckout = () => {
    const authToken = localStorage.getItem("authToken");
    const isAuthenticated = !!authToken;

    console.log('Checkout Auth Check:', {
      isAuthenticated,
      authToken
    });

    if (isAuthenticated) {
      navigate('/checkout/address');
    } else {
      localStorage.setItem('redirectAfterLogin', '/checkout/address');
      navigate('/login');
    }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    calculateSubtotal(items);
  };

  const calculateSubtotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(total);
  };

  const updateQuantity = (itemId, change) => {
    const updatedItems = cartItems.map(item => {
      if (item._id === itemId) {
        const newQuantity = item.quantity + change;
        if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });

    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateSubtotal(updatedItems);
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateSubtotal(updatedItems);
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add items to begin shopping</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart ({cartItems.length} items)</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img src={`http://localhost:5000/uploads/products/${item.image}`} alt={item.name} />
              </div>

              <div className="item-details">
                <div className="item-info">
                  <h3>{item.brand}</h3>
                  <h4>{item.name}</h4>
                  <p className="item-size">Size: {item.size}</p>
                </div>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      disabled={item.quantity >= item.maxQuantity}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="item-price">
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() => removeItem(item._id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;