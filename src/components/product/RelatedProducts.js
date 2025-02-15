// RelatedProducts.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import '../../styles/components/related-products.css';

function RelatedProducts({ currentProductId }) {
  const navigate = useNavigate();

  const relatedProducts = [
    {
      id: 2,
      title: "GOTHIC CHAINED BLACK DENIM TOP",
      price: 1099,
      originalPrice: 2899,
      discount: 62,
      rating: 4.62,
      image: "https://freakins.com/cdn/shop/products/MyFreakins01272.jpg?v=1670596442&width=700"
    },
    {
      id: 3,
      title: "DENIM BUSTIER TOP",
      price: 999,
      originalPrice: 2699,
      discount: 63,
      rating: 4.75,
      image: "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700"
    },
    {
      id: 4,
      title: "JEAN CORSET TOP CURVE",
      price: 999,
      originalPrice: 2199,
      discount: 55,
      rating: 4.62,
      image: "https://freakins.com/cdn/shop/files/09JUNEPART2_8062-Edit.jpg?v=1718194545&width=700"
    }
  ].filter(product => product.id !== currentProductId);

  return (
    <section className="related-products">
      <div className="container">
        <h2 className="section-title">You May Also Like</h2>
        <div className="products-grid">
          {relatedProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="product-image"
                />
                <span className="discount-badge">-{product.discount}%</span>
              </div>
              <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <div className="rating-container">
                  <FiStar className="star-icon" />
                  <span className="rating-value">{product.rating}</span>
                </div>
                <div className="price-container">
                  <span className="current-price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount-text">{product.discount}% Off</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;