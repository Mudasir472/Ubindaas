import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import QuickView from './QuickView';
import '../../styles/components/product-grid.css';
import axios from 'axios';

function ProductGrid() {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };

  const fetchAllProducts = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/`);
      const featuredProducts = resp?.data?.data?.products.filter(product => product.featured === true) || [];
      setAllProducts(featuredProducts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);





  return (
    <div className="products-section">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {Array.isArray(allProducts) && allProducts.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onQuickView={() => handleQuickView(product)}
          />
        ))}
        
      </div>
      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={handleCloseQuickView}
        />
      )}
    </div>
  );
}

export default ProductGrid;
