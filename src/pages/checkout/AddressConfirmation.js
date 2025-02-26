import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/checkout.css';

const AddressConfirmation = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    isDefault: false
  });

  useEffect(() => {
    // Fetch saved addresses
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/addresses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
        // Select default address if exists
        const defaultAddress = data.find(addr => addr.isDefault);
        setSelectedAddress(defaultAddress || data[0]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newAddress = await response.json();
        setAddresses(prev => [...prev, newAddress]);
        setSelectedAddress(newAddress);
        setShowAddForm(false);
        // Reset form
        setFormData({
          fullName: '',
          mobileNumber: '',
          pincode: '',
          address: '',
          locality: '',
          city: '',
          state: '',
          isDefault: false
        });
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }
    // Save selected address in session storage for payment page
    sessionStorage.setItem('checkoutAddress', JSON.stringify(selectedAddress));
    navigate('/checkout/payment');
  };

  return (
    <div className="checkout-container">
      <h1>Select Delivery Address</h1>

      {!showAddForm && (
        <div className="saved-addresses">
          {addresses.map((address) => (
            <div 
              key={address._id}
              className={`address-card ${selectedAddress?._id === address._id ? 'selected' : ''}`}
              onClick={() => setSelectedAddress(address)}
            >
              <div className="address-header">
                <h3>{address.fullName}</h3>
                {address.isDefault && <span className="default-badge">Default</span>}
              </div>
              <p>{address.mobileNumber}</p>
              <p>{address.address}</p>
              <p>{address.locality}</p>
              <p>{`${address.city}, ${address.state} - ${address.pincode}`}</p>
            </div>
          ))}
          
          <button 
            className="add-address-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Add New Address
          </button>
        </div>
      )}

      {showAddForm && (
        <form className="address-form" onSubmit={handleAddressSubmit}>
          <h2>Add New Address</h2>
          
          <div className="form-grid">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address (House No, Street, Area)"
              value={formData.address}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="locality"
              placeholder="Locality/Town"
              value={formData.locality}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
              />
              Make this my default address
            </label>

            <div className="form-buttons">
              <button type="button" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button type="submit">Save Address</button>
            </div>
          </div>
        </form>
      )}

      <div className="checkout-actions">
        <button 
          className="proceed-button"
          onClick={handleProceedToPayment}
          disabled={!selectedAddress}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default AddressConfirmation;