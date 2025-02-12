import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiHeart, FiPackage, FiMapPin, FiLogOut } from 'react-icons/fi';
import CategoryNav from './CategoryNav';
import '../../styles/components/navbar.css';

function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const isAuthenticated = localStorage.getItem('token');

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      setShowProfileMenu(!showProfileMenu);
    } else {
      // Redirect to login
      window.location.href = '/login';
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="nav-links">
          <Link to="/">Women</Link>
          <Link to="/">Men</Link>
        </div>
        
        <Link to="/" className="logo">
          UbinDaas
        </Link>
        
        <div className="nav-actions">
          <div className="search-container">
            <input type="text" placeholder="What are you looking for?" />
            <FiSearch className="search-icon" />
          </div>
          
          <div className="profile-container">
            <button className="profile-btn" onClick={handleProfileClick}>
              <FiUser />
            </button>
            
            {showProfileMenu && isAuthenticated && (
              <div className="profile-menu">
                <Link to="/profile" className="menu-item">
                  <FiUser />
                  <span>My Profile</span>
                </Link>
                <Link to="/profile/orders" className="menu-item">
                  <FiPackage />
                  <span>My Orders</span>
                </Link>
                <Link to="/profile/wishlist" className="menu-item">
                  <FiHeart />
                  <span>Wishlist</span>
                </Link>
                <Link to="/profile/addresses" className="menu-item">
                  <FiMapPin />
                  <span>Addresses</span>
                </Link>
                <button 
                  className="menu-item logout"
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <Link to="/cart" className="cart-icon">
            <FiShoppingCart />
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>
      <CategoryNav />
    </header>
  );
}

export default Navbar;