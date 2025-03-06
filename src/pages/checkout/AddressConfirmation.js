import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/checkout.css';
import axios from 'axios';

const AddressConfirmation = () => {
  const [useraddresses, setUserAddresses] = useState([
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

  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    isDefault: false
  });

  useEffect(() => {
    // Fetch saved addresses
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
      const defaultAddress = Array.isArray(data) && data?.find(addr => addr.isDefault);
      setSelectedAddress(defaultAddress || data[0]);

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

      const response = await axios.post('http://localhost:5000/api/customer/addresses', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      });


      if (response.status === 200 || response.status === 201) {
        const newAddress = response.data;
        console.log(newAddress);
        setAddresses(prev => Array.isArray(prev) ? [...prev, newAddress] : [newAddress]);
        setSelectedAddress(newAddress);
        setShowAddForm(false);

        // Reset form
        setFormData({
          type: '',
          street: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
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
          {Array.isArray(addresses) && addresses?.map((address) => (
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
              <p>{address.street}</p>
              <p>{`${address.city}, ${address.state} - ${address.pincode}, ${address.country}`}</p>
            </div>
          ))}

          <button className="add-address-btn" onClick={() => setShowAddForm(true)}>
            + Add New Address
          </button>
        </div>
      )}

      {showAddForm && (
        <form className="address-form" onSubmit={handleAddressSubmit}>
          <h2>Add New Address</h2>

          <div className="form-grid">
            <select name="type" value={formData.type} onChange={handleInputChange} required>
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>

            <input
              type="text"
              name="street"
              placeholder="Street (House No, Area)"
              value={formData.street}
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

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country || 'India'}
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