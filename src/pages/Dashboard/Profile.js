import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import '../../styles/pages/profile.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210'
  });

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
          <form className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input 
                  type="text" 
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input 
                  type="email" 
                  value={personalInfo.email}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-group">
                <FiPhone className="input-icon" />
                <input 
                  type="tel" 
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                />
              </div>
            </div>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </form>
        )}

        {activeTab === 'password' && (
          <form className="profile-form">
            <div className="form-group">
              <label>Current Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input type="password" />
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input type="password" />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input type="password" />
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