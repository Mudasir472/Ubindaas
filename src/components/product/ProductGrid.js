import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSideBar';
import QuickView from './QuickView';
import { FiFilter } from 'react-icons/fi';
import '../../styles/components/product-grid.css';
import axios from 'axios';

function ProductGrid() {
  const [offer, setOffer] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priceRanges: [],
    discounts: []
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };


  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };

  const fetchAllProducts = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/`);
      setAllProducts(resp?.data?.data?.products || []);
      setFilteredProducts(resp?.data?.data?.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
    setIsFilterOpen(false);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    let result = [...allProducts];

    if (Object.values(activeFilters).some(arr => arr.length > 0)) {
      if (activeFilters.categories.length > 0) {
        result = result.filter(product =>
          activeFilters.categories.includes(product.category?.name)
        );
      }

      if (activeFilters.priceRanges.length > 0) {
        result = result.filter(product => {
          return activeFilters.priceRanges.some(range => {
            if (range === '2000+') return product.price >= 2000;
            const [min, max] = range.split('-').map(Number);
            return product.price >= min && product.price <= max;
          });
        });
      }

      if (activeFilters.discounts.length > 0) {
        result = result.filter(product => {
          const productDiscount = Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
          );
          return activeFilters.discounts.some(discount => {
            const minDiscount = parseInt(discount);
            return productDiscount >= minDiscount;
          });
        });
      }
    }

    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.averageRating - a.averageRating;
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(result);
  }, [activeFilters, sortBy, allProducts]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="products-section">
      <div className="filters-bar">


      </div>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeFilters={activeFilters}
        onApplyFilters={handleApplyFilters}
      />

      <div className="product-grid mt-5">
        {filteredProducts.slice(0, showAll ? filteredProducts.length : 4).map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onQuickView={() => handleQuickView(product)}
          />
        ))}
      </div>

      <p className='d-flex align-items-center justify-content-center'>
        {filteredProducts.length > 4 && (
          <button
            className="view-all-btn mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        )}
      </p>
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