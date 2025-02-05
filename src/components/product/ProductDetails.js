// src/pages/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/pages/product-details.css';

function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="product-details-page">
      <div className="product-container">
        {/* Full product details page content */}
        <h1>Full Product Details Page</h1>
        <p>Product ID: {id}</p>
      </div>
    </div>
  );
}

export default ProductDetails;