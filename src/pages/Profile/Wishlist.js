import React, { useEffect, useState } from 'react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import '../../styles/pages/wishlist.css';
import axios from 'axios';

function Wishlist() {
  const [wishItems, setWishItems] = useState(null);
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
  const fetchWishListItems = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/customer/wishlist', {
        headers: {
          authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });

      setWishItems(response?.data?.wishlist);

    } catch (err) {
      console.log(err);

    }
  }
  console.log(wishItems);

  useEffect(() => {
    fetchWishListItems();
  }, []);
  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <span>{wishItems?.length} items</span>
        </div>

        {
          wishItems === 'null' ? (<>
            <h2>No items</h2>
          </>) : (<>
            <div className="wishlist-grid">
              {(wishItems)?.map(item => (
                <div key={item._id} className="wishlist-item">
                  <button className="remove-btn">
                    <FiHeart />
                  </button>

                  <div className="item-image">
                    {console.log(item)}

                    <img src={`http://localhost:5000/uploads/products/${item?.images[0]}`} alt={item.title} />
                  </div>

                  <div className="item-detailss">
                    <h3>{item.name}</h3>
                    <div className="price-details">
                      <span className="current-price">₹{item.price}</span>
                      <span className="original-price">₹{item.originalPrice}</span>
                      <span className="discount">{item.discount}% OFF</span>
                    </div>

                    <button
                      className={`add-to-cart ${!item?.stock > 0 ? 'out-of-stock' : ''}`}
                      disabled={!item?.stock > 0}
                    >
                      <FiShoppingBag />
                      {item?.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>)
        }

      </div>
    </div>
  );
}

export default Wishlist;