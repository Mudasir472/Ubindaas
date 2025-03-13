import React, { useEffect, useState } from 'react';
import { FiClock, FiChevronDown } from 'react-icons/fi';
import '../../styles/pages/orders.css';
import axios from 'axios';
import toast from 'react-hot-toast';

function Orders() {
  const [activeTab, setActiveTab] = useState('all');
  const [allOrders, setOrders] = useState(null);
  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'processing', label: 'Processing' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,

        });
        setOrders(response?.data?.orders);
      } catch (err) {
        toast.error(err.message || "Failed to fetch courses.");
      }
    };
    fetchOrders();
  }, []);
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
    },

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
              className={`tab-btn me-3 mb-3 ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="orders-list">
          {
            allOrders?.length > 0 ? (<>
              {allOrders
                .filter(order => activeTab === 'all' || order.status.toLowerCase() === activeTab)
                .map(order => (  //
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3 className='me-3'>{order?.orderId}</h3>
                        <span className="order-date">
                          <FiClock />
                          {new Date(order?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={`order-status status-${order?.status.toLowerCase()}`}>
                        {order?.status}
                      </span>
                    </div>
                    {console.log(order)
                    }
                    <div className="order-items">
                      {order?.items?.map((item) => (
                        <div key={item._id} className="order-item">
                          <img
                            style={{ height: '125px' }}
                            src={`http://localhost:5000/uploads/products/${item.product?.images[0]}` || 'https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700'}
                            alt={item.product?.name}
                          />
                          <div className="item-details">
                            <h4>{item.product?.name || 'DENIM BUSTIER TOP'}</h4>
                            <p>Size: {item.size || 'S'}</p>
                            <span className="item-price">₹{item.product?.price || '1099'}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <span className="order-total">
                        Total: ₹{order.totalAmount}
                      </span>
                      <button className="track-order-btn">
                        Track Order
                      </button>
                    </div>
                  </div>
                ))}
            </>) : (<>
              <p className='mt-4'>
                {"No order yet"}
              </p>
            </>)
          }


        </div>
      </div>
    </div>
  );
}

export default Orders;