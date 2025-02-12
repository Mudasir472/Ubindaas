import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiMapPin, FiUser, FiSettings, FiClock } from 'react-icons/fi';
import '../../styles/pages/dashboard.css';

function Dashboard() {
  // Mock user data (replace with context/API data later)
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    recentOrders: [
      {
        id: '#ORD123456',
        date: '2024-02-10',
        status: 'Delivered',
        total: 1999,
        items: 2
      },
      // Add more orders as needed
    ]
  };

  const dashboardCards = [
    {
      icon: <FiShoppingBag />,
      title: 'My Orders',
      description: 'Track, return, or buy things again',
      link: '/dashboard/orders'
    },
    {
      icon: <FiUser />,
      title: 'Profile Settings',
      description: 'Change your profile details & password',
      link: '/dashboard/profile'
    },
    {
      icon: <FiMapPin />,
      title: 'Addresses',
      description: 'Save addresses for checkout',
      link: '/dashboard/addresses'
    },
    {
      icon: <FiHeart />,
      title: 'Wishlist',
      description: 'Your favorite items',
      link: '/dashboard/wishlist'
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* User Welcome Section */}
        <div className="dashboard-header">
          <div className="user-welcome">
            <h1>My Account</h1>
            <p>Welcome back, {user.name}!</p>
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="dashboard-grid">
          {dashboardCards.map((card, index) => (
            <Link to={card.link} key={index} className="dashboard-card">
              <div className="card-icon">{card.icon}</div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Orders Section */}
        <div className="recent-orders">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <Link to="/dashboard/orders" className="view-all">View All</Link>
          </div>
          <div className="orders-list">
            {user.recentOrders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-info">
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">
                    <FiClock /> {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="order-details">
                  <span className="order-items">{order.items} items</span>
                  <span className="order-total">₹{order.total}</span>
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <Link to={`/dashboard/orders/${order.id}`} className="view-order">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;