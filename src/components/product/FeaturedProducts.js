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
      <div className="category-header mt-5" style={{
        textAlign: 'center',
        marginBottom: '4vh',
        position: 'relative'

      }}>
        <h2 className="category-title" style={{
          fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 2rem)', // Responsive font size
          fontWeight: '500',
          textTransform: 'uppercase',
          display: 'inline-block',
          padding: '0 3vw',
          position: 'relative'
        }}>

          FEATURED PRODUCTS

        </h2>
      </div>
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
