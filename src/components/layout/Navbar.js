import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  FiSearch, 
  FiUser, 
  FiShoppingCart, 
  FiHeart, 
  FiPackage, 
  FiMapPin, 
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';
import CategoryNav from './CategoryNav';
import '../../styles/components/navbar.css';

function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login', { state: { from: '/profile' } });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowProfileMenu(false);
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowProfileMenu(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-top">
        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {showMobileMenu ? <FiX /> : <FiMenu />}
        </button>
        
        <Link to="/" className="logo">
          <img 
            src="/logo.jpeg" 
            alt="UbinDaas Logo" 
            style={{ height: "50px", width: "auto" }} 
          />
        </Link>
        
        <div className="nav-actions">
          {/* Desktop Search */}
          <div className="search-container">
            <input type="text" placeholder="What are you looking for?" />
            <FiSearch className="search-icon" />
          </div>

          {/* Mobile Search Icon */}
          <button 
            className="search-icon-mobile" 
            onClick={() => setShowSearchOverlay(true)}
          >
            <FiSearch />
          </button>
          
          <div className="profile-container">
            <button 
              className="profile-btn nav-icon" 
              onClick={handleProfileClick}
            >
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
                  onClick={handleLogout}
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

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <Link 
              to="/" 
              className="mobile-menu-item"
              onClick={() => setShowMobileMenu(false)}
            >
              Women
            </Link>
            <Link 
              to="/" 
              className="mobile-menu-item"
              onClick={() => setShowMobileMenu(false)}
            >
              Men
            </Link>
            {/* Add more menu items as needed */}
          </div>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {showSearchOverlay && (
        <div className="search-overlay active">
          <div className="search-overlay-header">
            <button 
              className="close-search"
              onClick={() => setShowSearchOverlay(false)}
            >
              <FiX />
            </button>
            <input 
              type="text" 
              placeholder="What are you looking for?"
              autoFocus
            />
          </div>
        </div>
      )}

      <CategoryNav />
    </header>
  );
}

export default Navbar;