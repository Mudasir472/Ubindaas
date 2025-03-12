import React, { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Menu, X, ShoppingCart, Heart, User } from 'lucide-react';
import '../../styles/components/navbar.css';
import logo from "../../assets/logo.jpeg";
import axios from "axios";

// Memoized Navigation Icons component with Lucide icons
const NavigationIcons = memo(() => (
  <div className="navbar-right">
    <Link to="/cart" className="icon-link" aria-label="Shopping Cart">
      <ShoppingCart size={20} />
      <span className="icon-text">Cart</span>
    </Link>
    <Link to="profile/wishlist" className="icon-link" aria-label="Wishlist">
      <Heart size={20} />
      <span className="icon-text">Wishlist</span>
    </Link>
    <Link to="/profile" className="icon-link" aria-label="Profile">
      <User size={20} />
      <span className="icon-text">Profile</span>
    </Link>
  </div>
));

const DashNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu if screen becomes large
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories`);
        setCategories(response?.data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const categorizedData = Array.isArray(categories)
    ? categories.reduce((acc, item) => {
        if (!acc[item.gender]) {
          acc[item.gender] = [];
        }
        acc[item.gender].push(item);
        return acc;
      }, {})
    : {};

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveCategory(null);
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // Close mobile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      
      if (isMobileMenuOpen && mobileMenu && !mobileMenu.contains(event.target) && 
          mobileMenuBtn && !mobileMenuBtn.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>

          <div className="categories-wrapper">
            <div className="dropdown">
              <button className="dropdown-btn">
                <span>Categories </span>
                <ChevronDown size={16} />
              </button>
              <div className="dropdown-content">
                {Object.entries(categorizedData).map(([gender, items]) => (
                  <div key={gender} className="category-item">
                    <span>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
                    <div className="subcategories-panel">
                      <ul style={{ listStyleType: 'none' }}>
                        {items?.map((item) => (
                          <li key={item._id}>
                            <Link to={`/category/${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-center">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              aria-label="Search"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>

        <div className="navbar-right desktop-icons">
          <NavigationIcons />
        </div>

        <div className="navbar-right mobile-nav-icons">
          <Link to="/cart" className="icon-link" aria-label="Shopping Cart">
            <ShoppingCart size={20} />
          </Link>
          <Link to="profile/wishlist" className="icon-link" aria-label="Wishlist">
            <Heart size={20} />
          </Link>
          <Link to="/profile" className="icon-link" aria-label="Profile">
            <User size={20} />
          </Link>
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Overlay style */}
      {isMobileMenuOpen && (
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <Link to="/" className="mobile-logo">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
            <button className="mobile-close-btn" onClick={toggleMobileMenu}>
              <X size={24} />
            </button>
          </div>
          
          <div className="mobile-search">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search for products, brands and more" />
            <button className="mobile-search-btn">Search</button>
          </div>

          <div className="mobile-categories">
            {Object.entries(categorizedData).map(([gender, items]) => (
              <div key={gender} className="mobile-category">
                <button
                  className="mobile-category-btn"
                  onClick={() => toggleCategory(gender)}
                >
                  <span>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
                  <ChevronDown
                    className={`transform transition-transform ${activeCategory === gender ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeCategory === gender && items?.length > 0 && (
                  <div className="mobile-subcategories">
                    <ul>
                      {items.map((item) => (
                        <li key={item._id}>
                          <Link 
                            to={`/category/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={toggleMobileMenu}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Overlay background for mobile menu */}
      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}
    </nav>
  );
};

export default memo(DashNavBar);