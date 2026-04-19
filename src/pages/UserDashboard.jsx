import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCheckCircle, FaHourglassHalf, FaUser, FaMapMarkerAlt, FaHeart, FaBell } from 'react-icons/fa';
import toast from 'react-hot-toast';
import '../styles/Dashboard.css';

const UserDashboard = ({ userData }) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('userBookings');
    if (saved) {
      const userBookings = JSON.parse(saved);
      setBookings(userBookings);
    }
    
    // Check for accepted notifications
    const interval = setInterval(() => {
      const updated = localStorage.getItem('userBookings');
      if (updated) {
        const newBookings = JSON.parse(updated);
        setBookings(newBookings);
        
        // Check for newly accepted bookings
        newBookings.forEach(booking => {
          if (booking.status === 'accepted' && !notifications.find(n => n.id === booking.id)) {
            setNotifications(prev => [...prev, { id: booking.id, message: `${booking.volunteerName} has accepted your request! They will arrive in 30 minutes.` }]);
            toast.success(`${booking.volunteerName} accepted your request!`);
          }
        });
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [notifications]);

  const stats = {
    total: bookings.length,
    completed: bookings.filter(b => b.status === 'accepted').length,
    pending: bookings.filter(b => b.status === 'pending').length
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, {userData?.name || 'Resident'}!</p>
        </div>
        
        {notifications.length > 0 && (
          <div className="notifications">
            {notifications.map(n => (
              <div key={n.id} className="notification success"><FaBell /> {n.message}</div>
            ))}
          </div>
        )}
        
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon"><FaCalendarAlt /></div><div className="stat-value">{stats.total}</div><div className="stat-label">Total Bookings</div></div>
          <div className="stat-card"><div className="stat-icon"><FaCheckCircle /></div><div className="stat-value">{stats.completed}</div><div className="stat-label">Accepted</div></div>
          <div className="stat-card"><div className="stat-icon"><FaHourglassHalf /></div><div className="stat-value">{stats.pending}</div><div className="stat-label">Pending</div></div>
        </div>
        
        <div className="dashboard-section">
          <h2 className="section-title">My Profile</h2>
          <div className="profile-card">
            <div className="profile-avatar"><FaUser /></div>
            <div className="profile-info"><p><strong>Name:</strong> {userData?.name || 'Not set'}</p><p><strong>Email:</strong> {userData?.email || 'Not set'}</p><p><strong>Phone:</strong> {userData?.phone || 'Not set'}</p><p><strong>Address:</strong> {userData?.address?.fullAddress || 'Not set'}</p></div>
          </div>
        </div>
        
        <div className="dashboard-section">
          <h2 className="section-title">My Bookings</h2>
          {bookings.length === 0 ? (
            <div className="empty-state"><FaHeart className="empty-icon" /><p>No bookings yet.</p><button className="find-btn" onClick={() => navigate('/find-volunteers')}>Find Volunteers</button></div>
          ) : (
            <div className="bookings-grid">
              {bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header"><h3>{booking.service}</h3><span className={`booking-status ${booking.status === 'accepted' ? 'status-accepted' : 'status-pending'}`}>{booking.status === 'accepted' ? 'Accepted' : 'Pending'}</span></div>
                  <div className="booking-details"><p><strong>Volunteer:</strong> {booking.volunteerName}</p><p><FaCalendarAlt /> {booking.date} at {booking.time}</p><p><FaMapMarkerAlt /> {booking.address}</p></div>
                  {booking.status === 'accepted' && <div className="arrival-message">🕐 Volunteer will arrive within 30 minutes!</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button className="new-booking-btn" onClick={() => navigate('/find-volunteers')}>+ New Booking</button>
      </div>
    </div>
  );
};

export default UserDashboard;