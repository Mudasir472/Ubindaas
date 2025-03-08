import React, { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Menu, X, ShoppingCart, Heart, User } from 'lucide-react';
import '../../styles/components/navbar.css';
import logo from "../../assets/logo.jpeg";
import axios from "axios";



// Categories data
// const allcategories = {

//   "Women's Fashion": {
//     subcategories: [
//       {
//         title: "Shop All Ethnic Wear",
//         items: ["Kurtis & Kurtas", "Suits", "Sarees", "Lehengas", "Bottoms", "Blouses & Fabrics", "Dupattas", "Ethnic dresses"]
//       },
//       {
//         title: "Shop All Western Wear",
//         items: ["Tops & T-shirts", "Dresses", "Jeans", "Shirts", "Trousers", "Skirts", "Shorts", "Jackets & Blazers", "Leggings", "Capris", "Jumpsuits", "Shrugs", "Sweaters", "Sweatshirts"]
//       },
//       {
//         title: "Activewear & Sportswear",
//         items: ["T-shirts", "Shorts", "Sets", "Jackets", "Track Pants", "Innerwear"]
//       }
//     ]
//   },
//   "Men's Fashion": {
//     subcategories: [
//       {
//         title: "Tops",
//         items: ["T-shirts", "Polo T-shirts", "Shirts", "Formal Shirts", "Sweatshirts", "Jackets", "Suits", "Blazers"]
//       },
//       {
//         title: "Bottoms",
//         items: ["Jeans", "Chinos", "Trousers", "Formal Trousers", "Shorts", "Joggers", "Trackpants"]
//       },
//       {
//         title: "Activewear",
//         items: ["T-Shirts & Jerseys", "Sports Shorts", "Sports Jackets", "Joggers"]
//       }


//     ]
//   },

// };

// Memoized Navigation Icons component with Lucide icons
const NavigationIcons = memo(() => (
  <div className="navbar-right">
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
));

const DashNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState({});
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
                {/* {Object.entries(allcategories).map(([category, { subcategories }]) => (
                  <div key={category} className="category-item">
                    <span>{category}</span>
                    {subcategories.length > 0 && (
                      <div className="subcategories-panel">
                        <div className="subcategories-grid">
                          {subcategories.map((section, idx) => (
                            <div key={idx} className="subcategory-column">
                              <h3>{section.title}</h3>
                              <ul>
                                {section.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <Link to={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))} */}
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
          {/* <div className="categories-wrapper">
            <div className="dropdown">
              <button className="dropdown-btn">
                <span>Categories</span>
                <ChevronDown size={16} />
              </button>
              <div className="dropdown-content">
                {Object.entries(allcategories).map(([category, { subcategories }]) => (
                  <div key={category} className="category-item">
                    <span>{category}</span>
                    {subcategories.length > 0 && (
                      <div className="subcategories-panel">
                        <div className="subcategories-grid">
                          {subcategories.map((section, idx) => (
                            <div key={idx} className="subcategory-column">
                              <h3>{section.title}</h3>
                              <ul>
                                {section.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <Link to={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}>
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div> */}

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

        <NavigationIcons />

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search for products, brands and more" />
          </div>

          <div className="mobile-categories">
            {Object.entries(categories).map(([category, { subcategories }]) => (
              <div key={category} className="mobile-category">
                <button
                  className="mobile-category-btn"
                  onClick={() => toggleCategory(category)}
                >
                  <span>{category}</span>
                  <ChevronDown
                    className={`transform transition-transform ${activeCategory === category ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {activeCategory === category && subcategories.length > 0 && (
                  <div className="mobile-subcategories">
                    {subcategories.map((section, idx) => (
                      <div key={idx} className="mobile-subcategory-section">
                        <h3>{section.title}</h3>
                        <ul>
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link to={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mobile-links">
            <Link to="/Cart" className="mobile-link">Cart</Link>
            <Link to="profile/wishlist" className="mobile-link">Wishlist</Link>
            <Link to="/profile" className="mobile-link">Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default memo(DashNavBar);