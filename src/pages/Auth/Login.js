import React, { useContext, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import '../../styles/pages/auth.css';
import { LoginContext } from '../../context/AuthContext';
import toast from "react-hot-toast"

// Define API base URL
const API_BASE_URL = 'http://localhost:5000';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/profile';
  const { loginData, setLoginData } = useContext(LoginContext)

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific errors when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general login error when user makes changes
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (validateForm()) {
      setIsLoading(true);
      
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/login`,
          formData,
          { withCredentials: true }
        );
        
        // Make sure we have valid response data
        if (response.data?.result?.user && response.data?.result?.authToken) {
          setLoginData(response.data.result.user);
          localStorage.setItem('authToken', JSON.stringify(response.data.result.authToken));
          localStorage.setItem('user', JSON.stringify(response.data.result.user));
          
          toast.success("Login Successful");
          navigate(from, { replace: true });
        } else {
          // Handle unexpected response format
          console.error("Unexpected response format:", response.data);
          toast.error("Login failed: Unexpected server response");
          setLoginError("Unexpected server response format");
        }
      } catch (error) {
        console.error("Login error:", error);
        
        // Extract the error message from the response if available
        const errorMessage = error.response?.data?.error || 
                             error.message || 
                             "Login failed. Please check your credentials.";
        
        toast.error(errorMessage);
        setLoginError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>

          {loginError && (
            <div className="error-alert">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" disabled={isLoading} />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button type="button" className="google-btn" disabled={isLoading}>
              <img src="/images/google-icon.png" alt="Google" />
              Sign in with Google
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?
            <Link to="/signup"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;