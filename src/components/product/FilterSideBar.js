import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import '../../styles/components/filter-sidebar.css';

function FilterSidebar({ isOpen, onClose, activeFilters, onApplyFilters }) {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRanges: [],
    discounts: []
  });

  useEffect(() => {
    setSelectedFilters(activeFilters);
  }, [activeFilters]);

  const filterOptions = {
    categories: [
      'Tops', 'Dresses', 'Bottoms', 'Denim', 'Jackets', 'Curve'
    ],
    priceRanges: [
      { id: '0-500', label: 'Under ₹500' },
      { id: '500-1000', label: '₹500 - ₹1000' },
      { id: '1000-1500', label: '₹1000 - ₹1500' },
      { id: '1500-2000', label: '₹1500 - ₹2000' },
      { id: '2000+', label: 'Over ₹2000' }
    ],
    discounts: [
      { id: '10+', label: '10% and above' },
      { id: '20+', label: '20% and above' },
      { id: '30+', label: '30% and above' },
      { id: '40+', label: '40% and above' },
      { id: '50+', label: '50% and above' }
    ]
  };

  const handleFilterChange = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const handleClear = () => {
    setSelectedFilters({
      categories: [],
      priceRanges: [],
      discounts: []
    });
  };

  const handleApply = () => {
    onApplyFilters(selectedFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="filter-overlay" onClick={onClose} />
      <div className="filter-sidebar">
        <div className="filter-header">
          <h3>Filters</h3>
          <button className="close-filter" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="filter-content">
          {/* Categories */}
          <div className="filter-section">
            <h4>Categories</h4>
            <div className="filter-options">
              {filterOptions.categories.map(category => (
                <label key={category} className="filter-option">
                  <input 
                    type="checkbox"
                    checked={selectedFilters.categories.includes(category)}
                    onChange={() => handleFilterChange('categories', category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="filter-options">
              {filterOptions.priceRanges.map(range => (
                <label key={range.id} className="filter-option">
                  <input 
                    type="checkbox"
                    checked={selectedFilters.priceRanges.includes(range.id)}
                    onChange={() => handleFilterChange('priceRanges', range.id)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Discount */}
          <div className="filter-section">
            <h4>Discount</h4>
            <div className="filter-options">
              {filterOptions.discounts.map(discount => (
                <label key={discount.id} className="filter-option">
                  <input 
                    type="checkbox"
                    checked={selectedFilters.discounts.includes(discount.id)}
                    onChange={() => handleFilterChange('discounts', discount.id)}
                  />
                  <span>{discount.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-footer">
          <button className="clear-btn" onClick={handleClear}>
            Clear All
          </button>
          <button className="apply-btn" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;