import React, { useContext, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import '../../styles/pages/auth.css';
import { LoginContext } from '../../context/AuthContext';
import toast from "react-hot-toast"


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
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

    if (validateForm()) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/login`,
          formData,
          { withCredentials: true }
        );
        setLoginData(response.data?.result?.user)
        localStorage.setItem('authToken', JSON.stringify(response.data?.result?.authToken))
        localStorage.setItem('user', JSON.stringify(response.data?.result?.user))
        // navigate('/profile')
        navigate(from, { replace: true });
        toast.success("Login Successfully")
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          {/* Logo added here */}
          {/* <div className="logo-container">
            <img src="logo.jpeg" alt="Bindass Logo" className="bindass-logo" />
          </div>
           */}
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>

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
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button type="button" className="google-btn">
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