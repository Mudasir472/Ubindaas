import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import '../../styles/components/related-products.css';

function RelatedProducts({ currentProductId }) {
  const navigate = useNavigate();

  const relatedProducts = [
    {
      id: 1,
      title: "DENIM BUSTIER TOP",
      price: 999,
      originalPrice: 2699,
      discount: 63,
      rating: 4.75,
      image: "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700"
    },
    // Add more related products
  ].filter(product => product.id !== currentProductId);

  return (
    <div className="related-products">
      <h2>You May Also Like</h2>
      <div className="products-slider">
        {relatedProducts.map(product => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="product-image">
              <img src={product.image} alt={product.title} />
              <span className="discount-tag">{product.discount}% OFF</span>
            </div>
            <div className="product-details">
              <h3>{product.title}</h3>
              <div className="rating">
                <FiStar />
                <span>{product.rating}</span>
              </div>
              <div className="price">
                <span className="current-price">₹{product.price}</span>
                <span className="original-price">₹{product.originalPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;