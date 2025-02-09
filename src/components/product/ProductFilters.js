// src/components/product/ProductFilters.js
import React from 'react';
import { FiFilter } from 'react-icons/fi';
import '../../styles/components/product-filters.css';

function ProductFilters() {
  return (
    <div className="filters-section">
      <button className="filter-toggle">
        <FiFilter />
        Show filters (1)
      </button>
      <div className="sort-section">
        <button className="size-filter">Size</button>
        <select className="sort-select">
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilters;