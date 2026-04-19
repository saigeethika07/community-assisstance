import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaCheckCircle, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaBell, FaStar, FaTrophy, FaHandsHelping, FaUserCheck, FaChartLine, FaPhone, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';
import '../styles/Dashboard.css';

const VolunteerDashboard = ({ userData }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadData();
    // Check for new requests every 5 seconds
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const saved = localStorage.getItem('volunteerRequests');
    if (saved) {
      const all = JSON.parse(saved);
      setRequests(all.filter(r => r.status === 'pending'));
      setAccepted(all.filter(r => r.status === 'accepted'));
      setCompleted(all.filter(r => r.status === 'completed'));
    }
  };

  const handleAccept = (id, request) => {
    const saved = localStorage.getItem('volunteerRequests');
    const all = JSON.parse(saved);
    const updated = all.map(r => r.id === id ? { ...r, status: 'accepted' } : r);
    localStorage.setItem('volunteerRequests', JSON.stringify(updated));
    
    // Update user's booking status
    const userBookings = localStorage.getItem('userBookings');
    if (userBookings) {
      const bookings = JSON.parse(userBookings);
      const updatedBookings = bookings.map(b => 
        b.id === id ? { ...b, status: 'accepted' } : b
      );
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    }
    
    loadData();
    toast.success(`Request accepted! ${request.userName} has been notified.`);
    setNotifications([...notifications, { id: Date.now(), message: `You accepted request from ${request.userName}` }]);
  };

  const handleComplete = (id, request) => {
    const saved = localStorage.getItem('volunteerRequests');
    const all = JSON.parse(saved);
    const updated = all.map(r => r.id === id ? { ...r, status: 'completed' } : r);
    localStorage.setItem('volunteerRequests', JSON.stringify(updated));
    
    loadData();
    toast.success(`Service completed for ${request.userName}!`);
  };

  const stats = {
    pending: requests.length,
    accepted: accepted.length,
    completed: completed.length,
    totalEarnings: accepted.length * 0, // Free service
    rating: 4.9
  };

  // Get unique areas from requests
  const serviceAreas = [...new Set(requests.map(r => r.userAddress?.split(',').pop() || 'Various'))];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Welcome Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Volunteer Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, {userData?.name || 'Volunteer'}!</p>
          <div className="volunteer-badge">
            <FaHandsHelping /> Making a difference in Guntur community
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <FaClock className="stat-icon pending-icon" />
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending Requests</div>
          </div>
          <div className="stat-card">
            <FaCheckCircle className="stat-icon accepted-icon" />
            <div className="stat-value">{stats.accepted}</div>
            <div className="stat-label">Accepted</div>
          </div>
          <div className="stat-card">
            <FaTrophy className="stat-icon completed-icon" />
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <FaStar className="stat-icon rating-icon" />
            <div className="stat-value">{stats.rating}</div>
            <div className="stat-label">Rating</div>
          </div>
        </div>

        {/* Service Areas */}
        {serviceAreas.length > 0 && (
          <div className="dashboard-section">
            <h2 className="section-title">Your Service Areas</h2>
            <div className="areas-card">
              <div className="areas-list">
                {serviceAreas.map((area, idx) => (
                  <span key={idx} className="area-tag">{area}</span>
                ))}
              </div>
              <p className="travel-info">🚗 Willing to travel within Guntur city</p>
            </div>
          </div>
        )}

        {/* Pending Requests Section */}
        <div className="dashboard-section">
          <h2 className="section-title">
            <FaBell className="section-icon" /> Pending Requests ({requests.length})
          </h2>
          {requests.length === 0 ? (
            <div className="empty-state">
              <FaHandsHelping className="empty-icon" />
              <p>No pending requests</p>
              <p className="empty-subtitle">When residents request help, you'll see them here</p>
            </div>
          ) : (
            <div className="requests-grid">
              {requests.map(r => (
                <div key={r.id} className="request-card">
                  <div className="request-header">
                    <h3>{r.userName}</h3>
                    <span className="status-pending-badge">Pending</span>
                  </div>
                  <div className="request-details">
                    <p><FaCalendarAlt /> {r.date} at {r.time}</p>
                    <p><FaMapMarkerAlt /> {r.userAddress}</p>
                    <p><strong>Service:</strong> {r.service}</p>
                    {r.specialInstructions && (
                      <p className="special-instructions"><strong>Instructions:</strong> {r.specialInstructions}</p>
                    )}
                    <p><FaPhone /> Contact: {r.userPhone || 'Will be shared after acceptance'}</p>
                  </div>
                  <button className="accept-btn" onClick={() => handleAccept(r.id, r)}>
                    Accept Request
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accepted Requests Section */}
        {accepted.length > 0 && (
          <div className="dashboard-section">
            <h2 className="section-title">
              <FaUserCheck className="section-icon" /> Accepted Requests ({accepted.length})
            </h2>
            <div className="accepted-grid">
              {accepted.map(r => (
                <div key={r.id} className="accepted-card">
                  <div className="accepted-header">
                    <h3>{r.userName}</h3>
                    <span className="status-accepted-badge">Accepted</span>
                  </div>
                  <div className="accepted-details">
                    <p><FaCalendarAlt /> {r.date} at {r.time}</p>
                    <p><FaMapMarkerAlt /> {r.userAddress}</p>
                    <p><strong>Service:</strong> {r.service}</p>
                    <div className="arrival-badge">📍 Please arrive within 30 minutes</div>
                  </div>
                  <button className="complete-btn" onClick={() => handleComplete(r.id, r)}>
                    Mark as Completed
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Section */}
        {completed.length > 0 && (
          <div className="dashboard-section">
            <h2 className="section-title">
              <FaTrophy className="section-icon" /> Completed Services ({completed.length})
            </h2>
            <div className="completed-grid">
              {completed.slice(0, 5).map(r => (
                <div key={r.id} className="completed-card">
                  <div className="completed-header">
                    <h3>{r.userName}</h3>
                    <FaCheckCircle className="completed-icon" />
                  </div>
                  <p><FaCalendarAlt /> {r.date}</p>
                  <p><strong>Service:</strong> {r.service}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="dashboard-section">
          <h2 className="section-title">Your Profile</h2>
          <div className="profile-card">
            <div className="profile-avatar">
              <FaHandsHelping />
            </div>
            <div className="profile-info">
              <p><strong>Name:</strong> {userData?.name || 'Not set'}</p>
              <p><strong>Email:</strong> {userData?.email || 'Not set'}</p>
              <p><strong>Phone:</strong> {userData?.phone || 'Not set'}</p>
              <p><strong>Skills:</strong> {userData?.skills?.join(', ') || 'Not set'}</p>
              <p><strong>Experience:</strong> {userData?.experience || 'Not set'} years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;