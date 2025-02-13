import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import '../../styles/pages/addresses.css';

function Addresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      type: 'Home',
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '9876543210',
      isDefault: true
    }
    // Add more addresses
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="addresses-page">
      <div className="addresses-container">
        <div className="addresses-header">
          <h1>My Addresses</h1>
          <button 
            className="add-address-btn"
            onClick={() => setShowAddForm(true)}
          >
            <FiPlus />
            Add New Address
          </button>
        </div>

        <div className="addresses-grid">
          {addresses.map(address => (
            <div key={address.id} className="address-card">
              {address.isDefault && (
                <span className="default-badge">Default</span>
              )}
              
              <div className="address-type">{address.type}</div>
              <h3>{address.name}</h3>
              <p>{address.address}</p>
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p>Phone: {address.phone}</p>

              <div className="address-actions">
                <button className="edit-btn">
                  <FiEdit2 />
                  Edit
                </button>
                <button className="delete-btn">
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showAddForm && (
          <div className="address-form-modal">
            {/* Address form content */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Addresses;