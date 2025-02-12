import React from 'react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import '../../styles/pages/wishlist.css';

function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      title: "DENIM BUSTIER TOP",
      price: 999,
      originalPrice: 2699,
      discount: 63,
      size: "M",
      image: "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700",
      inStock: true
    }
    // Add more items
  ];

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <span>{wishlistItems.length} items</span>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <button className="remove-btn">
                <FiHeart />
              </button>
              
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="item-details">
                <h3>{item.title}</h3>
                <div className="price-details">
                  <span className="current-price">₹{item.price}</span>
                  <span className="original-price">₹{item.originalPrice}</span>
                  <span className="discount">{item.discount}% OFF</span>
                </div>

                <button 
                  className={`add-to-cart ${!item.inStock ? 'out-of-stock' : ''}`}
                  disabled={!item.inStock}
                >
                  <FiShoppingBag />
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;