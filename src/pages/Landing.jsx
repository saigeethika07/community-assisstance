import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHandsHelping, FaUserFriends, FaArrowRight, FaHeart, FaShieldAlt, FaClock, FaStar } from 'react-icons/fa';
import '../styles/Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="animated-bg">
        <div className="sphere sphere-1"></div>
        <div className="sphere sphere-2"></div>
        <div className="sphere sphere-3"></div>
      </div>

      <div className="landing-content">
        <div className="landing-header">
          <div className="logo-wrapper">
            <FaHeart className="logo-icon" />
            <h1 className="landing-logo">Community Connect</h1>
          </div>
          <p className="landing-tagline">Your Community. Your Help. Your Safety.</p>
          <div className="trust-badge">
            <FaShieldAlt />
            <span>Trusted by 10,000+ Community Members</span>
          </div>
        </div>

        <div className="cards-container">
          {/* Resident / User Card */}
          <div className="choice-card need-help" onClick={() => navigate('/register?role=user')}>
            <div className="card-glow"></div>
            <FaUserFriends className="card-icon" />
            <h2>Register as Resident</h2>
            <p>Need help? Register as a resident to get assistance from verified volunteers in your community.</p>
            <div className="features">
              <span>✓ Get help for daily tasks</span>
              <span>✓ Connect with trusted volunteers</span>
              <span>✓ Completely free service</span>
            </div>
            <button className="card-btn">Register as Resident <FaArrowRight /></button>
            <p className="login-link">Already have an account? <span onClick={(e) => { e.stopPropagation(); navigate('/login'); }}>Login here</span></p>
          </div>

          {/* Volunteer Card */}
          <div className="choice-card become-volunteer" onClick={() => navigate('/register?role=volunteer')}>
            <div className="card-glow"></div>
            <FaHandsHelping className="card-icon" />
            <h2>Register as Volunteer</h2>
            <p>Want to help? Register as a volunteer to make a difference in your community.</p>
            <div className="features">
              <span>✓ Help neighbors in need</span>
              <span>✓ Flexible working hours</span>
              <span>✓ Get recognition for your service</span>
            </div>
            <button className="card-btn">Register as Volunteer <FaArrowRight /></button>
            <p className="login-link">Already have an account? <span onClick={(e) => { e.stopPropagation(); navigate('/login'); }}>Login here</span></p>
          </div>
        </div>

        <div className="landing-footer">
          <div className="stats-badge">
            <span>200+ Active Volunteers</span>
            <span>1000+ Happy Families</span>
            <span>98% Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;