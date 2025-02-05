import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import CategoryNav from './CategoryNav';
import '../../styles/components/navbar.css';

function Navbar() {
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
          <Link to="/account"><FiUser /></Link>
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