import React from 'react';
import CartItems from './CartItems';
import '../../styles/components/cart/cart-drawer.css';

const CartDrawer = ({ isOpen, onClose, cartItems, updateQuantity, removeItem, total }) => {
  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-drawer-content">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-items-container">
          <CartItems 
            items={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;