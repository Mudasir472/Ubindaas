import { Link } from 'react-router-dom';
import '../../styles/components/category-nav.css';

function CategoryNav() {
  return (
    <nav className="category-nav">
      <div className="category-container">
        <Link to="/sale" className="sale-link">SALE</Link>
        <Link to="/new-arrivals">New Arrivals</Link>
        <Link to="/jackets">Jackets</Link>
        <Link to="/bestsellers">Bestsellers</Link>
        <Link to="/korean-pants" className="trending">
          Korean Pants
          <span className="trending-badge">Trending</span>
        </Link>
        <Link to="/topwear">Topwear</Link>
        <Link to="/jeans">Jeans</Link>
        <Link to="/curve">Curve</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/restocked">Restocked</Link>
        <Link to="/cargo">Cargo</Link>
        <Link to="/special-deals">Special Deals</Link>
        <Link to="/influencer">Influencer Collab</Link>
        <Link to="/support">Support</Link>
      </div>
    </nav>
  );
}

export default CategoryNav;