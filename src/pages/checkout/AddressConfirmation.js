import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddressConfirmation = ({ cartItems }) => {
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
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/customer/addresses', {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true,
      });
      const data = response?.data?.data;
      setAddresses(data);
      setSelectedAddress(data.find(addr => addr.isDefault) || data[0]);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/customer/addresses', formData, {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        setAddresses([...addresses, response.data]);
        setSelectedAddress(response.data);
        setShowAddForm(false);
        toast.success("Address added successfull");
        setFormData({ type: '', street: '', city: '', state: '', pincode: '', country: '', isDefault: false });
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error(error?.response?.data?.message)
      setFormData({
        type: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        isDefault: false
      })
    }
  };

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'http://localhost:5000/api/orders/create', {
        items: cartItems?.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
          size: item?.size
        })),
        shippingAddress: selectedAddress,
        paymentMethod: 'cod',
        totalAmount: cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0),
      },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      toast.success('Order Placed Successfully ✅');
      navigate('/profile/orders');
    } catch (error) {
      console.error('Order Failed', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Select Delivery Address</h2>
      {!showAddForm ? (
        <div>
          {addresses.map((address) => (
            <div key={address._id} className={`card mb-2 p-3 ${selectedAddress?._id === address._id ? 'border-primary' : ''}`} onClick={() => setSelectedAddress(address)}>
              <h5>{address.fullName} {address.isDefault && <span className="badge bg-primary">Default</span>}</h5>
              <p>{address.street}, {address.city}, {address.state} - {address.pincode}, {address.country}</p>
              <p>{address.mobileNumber}</p>
            </div>
          ))}

          <button className="btn btn-outline-primary" onClick={() => setShowAddForm(true)}>+ Add New Address</button>
        </div>
      ) : (
        <form onSubmit={handleAddressSubmit} className="card p-3">
          <h4>Add New Address</h4>
          <div className="mb-2">
            <select className="form-select" name="type" value={formData.type} onChange={handleInputChange} required>
              <option value="">Select Type</option>
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input className="form-control mb-2" type="text" name="street" placeholder="Street" value={formData.street} onChange={handleInputChange} required />
          <input className="form-control mb-2" type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
          <input className="form-control mb-2" type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
          <input className="form-control mb-2" type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
          <input className="form-control mb-2" type="text" name="country" placeholder="Country" value={formData.country || 'India'} onChange={handleInputChange} required />
          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleInputChange} />
            <label className="form-check-label">Make this my default address</label>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Address</button>
          </div>
        </form>
      )}
      <div className='d-flex mt-5 items-center justify-content-between'>
        <div className="col-md-4">
          <h5>Payment Methods</h5>
          <select className="form-select mb-3" >
            <option value="cod">Cash on Delivery</option>
            <option disabled value="upi">UPI</option>
            <option disabled value="card">Credit/Debit Card</option>
          </select>
        </div>
        <div className="col-md-4">
          <h5>Your Cart</h5>
          {cartItems.map((item) => (
            <div key={item._id} className="card mb-2 p-2">
              <div className="d-flex align-items-center">
                <img src={item.image} alt={item.name} className="me-2" style={{ width: '50px', height: '50px' }} />
                <div>
                  <p className="mb-0">{item.name}</p>
                  <p className="mb-0">Qty: {item.quantity} | ₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}
          <h6>Total: ₹{cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h6>
        </div>

      </div>


      <div className="mt-3">
        <div className='d-flex items-center justify-content-center'>
          <button className="btn btn-success w-32" onClick={placeOrder} disabled={!selectedAddress}>Place Order</button>
        </div>
      </div>
    </div >
  );
};

export default AddressConfirmation;