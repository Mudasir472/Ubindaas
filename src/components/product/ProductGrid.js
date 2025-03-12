import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSideBar';
import QuickView from './QuickView';
import { FiFilter } from 'react-icons/fi';
import '../../styles/components/product-grid.css';
import axios from 'axios';

function ProductGrid() {
  const [offer, setOffer] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priceRanges: [],
    discounts: []
  });
  // console.log(allProducts);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };

  const fetchAllProducts = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/api/products/');
      // console.log(resp?.data?.data?.products);
      setAllProducts(resp?.data?.data?.products)
    } catch (err) {
      console.log(err);
    }
  }

  const initialProducts = [
    {
      id: 1,
      title: "CAVIAR BLACK KOREAN MINI SKORT",
      price: 1199,
      originalPrice: 1899,
      discount: 37,
      rating: 4.33,
      category: "Bottoms",
      image: "https://freakins.com/cdn/shop/files/4thjuly24_14382_20ecb707-0627-4380-b13c-3eb8e885116b.jpg?v=1720520146&width=700"
    },
    {
      id: 2,
      title: "GOTHIC CHAINED BLACK DENIM TOP",
      price: 1099,
      originalPrice: 2899,
      discount: 62,
      rating: 4.62,
      category: "Tops",
      image: "https://freakins.com/cdn/shop/products/MyFreakins01272.jpg?v=1670596442&width=700"
    },
    {
      id: 3,
      title: "DENIM BUSTIER TOP",
      price: 999,
      originalPrice: 2699,
      discount: 63,
      rating: 4.75,
      category: "Tops",
      image: "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700"
    },
    {
      id: 4,
      title: "JEAN CORSET TOP CURVE",
      price: 999,
      originalPrice: 2199,
      discount: 55,
      rating: 4.62,
      category: "Tops",
      image: "https://freakins.com/cdn/shop/files/09JUNEPART2_8062-Edit.jpg?v=1718194545&width=700"
    },
    {
      id: 5,
      title: "CAVIAR BLACK KOREAN MINI SKORT",
      price: 1199,
      originalPrice: 1899,
      discount: 37,
      rating: 4.33,
      category: "Bottoms",
      image: "https://freakins.com/cdn/shop/files/4thjuly24_14382_20ecb707-0627-4380-b13c-3eb8e885116b.jpg?v=1720520146&width=700"
    },
    {
      id: 6,
      title: "GOTHIC CHAINED BLACK DENIM TOP",
      price: 1099,
      originalPrice: 2899,
      discount: 62,
      rating: 4.62,
      category: "Tops",
      image: "https://freakins.com/cdn/shop/products/MyFreakins01272.jpg?v=1670596442&width=700"
    },
    {
      id: 7,
      title: "DENIM BUSTIER TOP",
      price: 999,
      originalPrice: 2699,
      discount: 63,
      rating: 4.75,
      category: "Tops",
      image: "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700"
    },
    {
      id: 8,
      title: "JEAN CORSET TOP CURVE",
      price: 999,
      originalPrice: 2199,
      discount: 55,
      rating: 4.62,
      category: "Tops",
      image: "https://freakins.com/cdn/shop/files/09JUNEPART2_8062-Edit.jpg?v=1718194545&width=700"
    },
    {
      id: 9,
      title: "CAVIAR BLACK KOREAN MINI SKORT",
      price: 1199,
      originalPrice: 1899,
      discount: 37,
      rating: 4.33,
      category: "Bottoms",
      image: "https://freakins.com/cdn/shop/files/4thjuly24_14382_20ecb707-0627-4380-b13c-3eb8e885116b.jpg?v=1720520146&width=700"
    },
    {
      id: 10,
      title: "GOTHIC CHAINED BLACK DENIM TOP",
      price: 1099,
      originalPrice: 2899,
      discount: 62,
      rating: 4.62,
      category: "Tops",
      image: "https://freakins.com/cdn/shop/products/MyFreakins01272.jpg?v=1670596442&width=700"
    },
    {
      id: 11,
      title: "DENIM BUSTIER TOP",
      price: 999,
      originalPrice: 2699,
      discount: 63,
      rating: 4.75,
      category: "Tops",
      image: "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700"
    },
    {
      id: 12,
      title: "JEAN CORSET TOP CURVE",
      price: 999,
      originalPrice: 2199,
      discount: 55,
      rating: 4.62,
      category: "Tops",
      image: "https://freakins.com/cdn/shop/files/09JUNEPART2_8062-Edit.jpg?v=1718194545&width=700"
    }
  ];

  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
    setIsFilterOpen(false);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    let result = [...products];

    // Only apply filters if they exist
    if (Object.values(activeFilters).some(arr => arr.length > 0)) {
      if (activeFilters.categories.length > 0) {
        result = result.filter(product =>
          activeFilters.categories.includes(product.category)
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
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(result);
  }, [activeFilters, sortBy, products]);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/banners');
        // console.log(response.data?.data);
        setOffer(response.data?.data)

      } catch (error) {
        console.log(error);

      }
    }
    fetchOffer();
  }, [])
  const offerBanner = Array.isArray(offer)
    ? offer.find((ele) => ele?.bannerFor === 'offer')
    : [];


  useEffect(() => {
    fetchAllProducts()
  }, [])
  return (
    <div className="products-section">
      <div className="filters-bar">
        <div className="sort-options">
          <h2 style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/new-arrival.png" style={{ width: '100%', height: '130px' }} alt="New Arrivals Banner" />
            {/* <img src={offerBanner?.image} style={{ width: '100%', height: '130px' }} alt="New Arrivals Banner" /> */}
          </h2>
        </div>
        <button
          className="filter-btn"
          onClick={() => setIsFilterOpen(true)}
        >
          <FiFilter />
          {Object.values(activeFilters).flat().length > 0
            ? `Filters (${Object.values(activeFilters).flat().length})`
            : 'Filters'}
        </button>
      </div>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeFilters={activeFilters}
        onApplyFilters={handleApplyFilters}
      />

      <div className="product-grid">
        {Array.isArray(filteredProducts) && filteredProducts.map(product => (
          <ProductCard
            key={product.id}
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