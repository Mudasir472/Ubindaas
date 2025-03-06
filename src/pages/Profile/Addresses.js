import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import '../../styles/pages/addresses.css';
import axios from 'axios';
import toast from 'react-hot-toast'

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

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/customer/addresses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(response);

      const data = response?.data?.data;
      setAddresses(data);

    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const [showAddForm, setShowAddForm] = useState(false);

  const handleDeleteAddress = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.delete(`http://localhost:5000/api/customer/addresses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(response);
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error(error.message)
    }
  }
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
                <button onClick={() => { handleDeleteAddress(address?._id) }} className="delete-btn">
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