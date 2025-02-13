import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiMapPin, FiUser } from 'react-icons/fi';
import '../../styles/pages/dashboard.css';

function ProfileDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="dashboard-header">
          <h1>My Account</h1>
          <p>Welcome back, {user?.name || 'User'}!</p>
        </div>

        {/* Dashboard Menu */}
        <div className="dashboard-menu">
          <Link to="/dashboard/profile" className="menu-card">
            <FiUser className="card-icon" />
            <div className="card-content">
              <h3>Profile</h3>
              <p>Manage your personal information</p>
            </div>
          </Link>

          <Link to="/dashboard/orders" className="menu-card">
            <FiShoppingBag className="card-icon" />
            <div className="card-content">
              <h3>Orders</h3>
              <p>Track, return, or buy things again</p>
            </div>
          </Link>

          <Link to="/dashboard/wishlist" className="menu-card">
            <FiHeart className="card-icon" />
            <div className="card-content">
              <h3>Wishlist</h3>
              <p>Your favorite items</p>
            </div>
          </Link>

          <Link to="/dashboard/addresses" className="menu-card">
            <FiMapPin className="card-icon" />
            <div className="card-content">
              <h3>Addresses</h3>
              <p>Save addresses for checkout</p>
            </div>
          </Link>
        </div>

        {/* Recent Orders Preview */}
        <div className="recent-orders">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <Link to="/dashboard/orders" className="view-all">View All</Link>
          </div>
          {/* Add recent orders list here */}
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;