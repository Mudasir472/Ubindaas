import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import '../../styles/components/cart/cart-icon.css';

const CartItems = ({ items, updateQuantity, removeItem }) => {
  if (!items.length) {
    return (
      <div className="empty-cart">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="cart-items">
      {items.map((item) => (
        <div key={item._id} className="cart-item">
          <img
            src={item.image}
            alt={item.name}
            className="item-images"
          />

          <div className="item-details">
            <h3>{item.name}</h3>
            <p className="item-price">${item.price.toFixed(2)}</p>

            <div className="quantity-controls">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="quantity-button"
                disabled={item.quantity <= 1}
              >
                <Minus />
              </button>

              <span className="quantity">{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="quantity-button"
              >
                <Plus />
              </button>
            </div>
          </div>

          <button
            onClick={() => removeItem(item._id)}
            className="remove-button"
          >
            <Trash2 />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
