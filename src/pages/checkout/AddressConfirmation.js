import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddressConfirmation = ({ cartItems }) => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    isDefault: false
  });
  console.log(cartItems);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/customer/addresses`, {
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
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/customer/addresses`, formData, {
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
  const totalMRP = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + (item.price - item.salePrice) * item.quantity, 0);
  const totalAmount = totalMRP - totalDiscount;
  const placeOrder = async () => {  //when cod
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    try {

      const token = localStorage.getItem('authToken');
      const resp = await axios.post(

        `${process.env.REACT_APP_API_BASE_URL}/api/orders/create`, {
        items: cartItems?.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
          size: item?.size
        })),
        shippingAddress: selectedAddress,
        paymentMethod: 'cod',
        totalAmount
      },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      toast.success('Order Placed Successfully ✅');
      navigate('/profile/orders');
    } catch (error) {
      console.error('Order Failed', error);
    }
  };

  // when use razorpay
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const orderDetails = {
        items: cartItems?.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
          size: item?.size
        })),
        shippingAddress: selectedAddress,
        paymentMethod: "Razorpay",
        totalAmount,
      };

      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/payment/create-order`, {
        amount: totalAmount,
        currency: "INR",
      });

      const options = {
        key: "your_razorpay_key_id",
        amount: totalAmount,
        currency: 'INR',
        name: "Ubindaas Ecom",
        description: "Online Payment",
        order_id: data.id,
        handler: async function (response) {
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/payment/verify-payment`, {
            ...response,
            orderDetails,
          }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });

          alert("Payment Successful!");
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };




  return (
    <div className="container mt-4">
      <h2 className="mb-4">Select Delivery Address</h2>
      {!showAddForm ? (
        <div className='d-flex gap-5'>
          <div className='w-50'>
            {addresses.map((address) => (
              <div key={address._id} className={`card mb-2 p-3 ${selectedAddress?._id === address._id ? 'border-primary' : ''}`} onClick={() => setSelectedAddress(address)}>
                <h5>{address.fullName} {address.isDefault && <span className="badge bg-primary">Default</span>}</h5>
                <p>{address.street}, {address.city}, {address.state} - {address.pincode}, {address.country}</p>
                <p>{address.mobileNumber}</p>
              </div>
            ))}

            <button className="btn btn-outline-primary" onClick={() => setShowAddForm(true)}>+ Add New Address</button>

            <div className="d-flex flex-column w-50 mt-5">
              <h5 className="mb-3">Select Payment Method</h5>

              {/* Cash on Delivery */}
              <div className={`p-3 border rounded ${selectedPayment === "cod" ? "border-dark" : ""}`}
                onClick={() => setSelectedPayment("cod")}
                style={{ cursor: "pointer" }}>
                <h6 className="m-0">Cash on Delivery</h6>
              </div>
              {selectedPayment === "cod" && (
                <button onClick={placeOrder} className="btn btn-dark mt-2" style={{ width: "150px" }}>Continue</button>
              )}

              {/* Online Payment */}
              <div className={`p-3 border rounded mt-3 ${selectedPayment === "online" ? "border-dark" : ""}`}
                onClick={() => setSelectedPayment("online")}
                style={{ cursor: "pointer" }}>
                <h6 className="m-0">Online Payment</h6>
              </div>
              {selectedPayment === "online" && (
                <button className="btn btn-dark mt-2" style={{ width: "150px" }}>Continue</button>
              )}
            </div>
          </div>
          <div className='d-flex flex-column w-50 items-center justify-content-between'>

            <div className="col-md-10">
              {cartItems.map((item) => (
                <div key={item._id} className="card mb-2 p-2">
                  <div className="d-flex align-items-center">
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/uploads/products/${item.image}`}
                      alt={item.name}
                      className="me-2"
                      style={{ width: '50px', height: '50px' }}
                    />
                    <div>
                      <p className="mb-0">{item.name}</p>
                      <p className="mb-0">
                        Qty: {item.quantity} | ₹{item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Payment Details Section */}
              <div className="mt-3 p-3 border rounded">
                <h6 className="mb-2">Payment Details</h6>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Total MRP</td>
                      <td className="text-end">₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td className="text-end">- ₹{cartItems.reduce((sum, item) => sum + (item.price - item.salePrice) * item.quantity, 0)}</td>
                    </tr>
                    <tr>
                      <td>Platform Fee</td>
                      <td className="text-end">Free</td>
                    </tr>
                    <tr>
                      <td>Shipping Fee</td>
                      <td className="text-end">Free</td>
                    </tr>
                    <tr className="fw-bold">
                      <td>Total Amount</td>
                      <td className="text-end">
                        ₹
                        {totalAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

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




    </div >
  );
};

export default AddressConfirmation;