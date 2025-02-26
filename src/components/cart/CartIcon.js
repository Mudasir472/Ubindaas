// src/components/cart/CartIcon.js
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import '../../styles/components/cart/cart-icon.css';

const CartIcon = ({ itemCount, toggleCart }) => {
  return (
    <button className="cart-icon" onClick={toggleCart}>
      <ShoppingCart />
      {itemCount > 0 && (
        <span className="cart-count">{itemCount}</span>
      )}
    </button>
  );
};

export default CartIcon;