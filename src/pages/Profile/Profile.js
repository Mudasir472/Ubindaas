import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import '../../styles/pages/profile.css';
import axios from 'axios';
import toast from 'react-hot-toast';

function Profile() {
  const currUser = JSON.parse(localStorage.getItem('user')) || {};
  const [activeTab, setActiveTab] = useState('personal');

  const [updateData, setUpdateData] = useState({
    name: currUser?.name || '',
    email: currUser?.email || '',
    phone: currUser?.phone || ''
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // handle passwrod change now
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/customer/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success(response?.data?.message || 'Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); // Clear form fields
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update password');
    }
  };


  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/customer/profile`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const updatedUser = response?.data?.user;
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Profile Settings</h1>

        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Information
          </button>
          <button
            className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
        </div>

        {activeTab === 'personal' && (
          <form className="profile-form" onSubmit={updateUser}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={updateData.name}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input type="email" value={updateData.email} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-group">
                <FiPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  value={updateData.phone}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </form>
        )}

        {activeTab === 'password' && (
          <form className="profile-form" onSubmit={changePassword}>
            <div className="form-group">
              <label>Current Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="save-btn">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
