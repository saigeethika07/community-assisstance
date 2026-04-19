import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaHandsHelping } from 'react-icons/fa';
import { login } from '../utils/api';
import toast from 'react-hot-toast';
import '../styles/Login.css';

const Login = ({ setIsAuthenticated, setUserRole, setUserData }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await login({ 
        email: formData.email, 
        password: formData.password, 
        role: formData.role 
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userData', JSON.stringify(user));
      
      setIsAuthenticated(true);
      setUserRole(user.role);
      setUserData(user);
      
      toast.success('Login successful!');
      navigate('/');
      
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Login to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="input-group">
            <FaLock className="input-icon" />
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          <div className="role-selector">
            <label className="role-option">
              <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleChange} />
              <FaUser /> I'm a Resident
            </label>
            <label className="role-option">
              <input type="radio" name="role" value="volunteer" checked={formData.role === 'volunteer'} onChange={handleChange} />
              <FaHandsHelping /> I'm a Volunteer
            </label>
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="login-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;