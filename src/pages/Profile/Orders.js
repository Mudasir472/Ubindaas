import React, { useState } from 'react';
import { FiClock, FiChevronDown } from 'react-icons/fi';
import '../../styles/pages/orders.css';

function Orders() {
  const [activeTab, setActiveTab] = useState('all');
  
  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'processing', label: 'Processing' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  // Mock orders data
  const orders = [
    {
      id: '#ORD123456',
      date: '2024-02-10',
      status: 'Delivered',
      total: 1999,
      items: [
        {
          id: 1,
          name: 'Denim Jacket',
          size: 'M',
          price: 999,
          image: '/path-to-image'
        }
      ]
    }
    // Add more orders
  ];

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>My Orders</h1>

        <div className="orders-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>{order.id}</h3>
                  <span className="order-date">
                    <FiClock />
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <span className={`order-status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Size: {item.size}</p>
                      <span className="item-price">₹{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-total">
                  Total: ₹{order.total}
                </span>
                <button className="track-order-btn">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;