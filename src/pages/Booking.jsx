import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowLeft, FaCheckCircle, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import '../styles/BookingConfirmation.css';

Modal.setAppElement('#root');

const Booking = ({ userData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [volunteer, setVolunteer] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    address: userData?.address?.fullAddress || '',
    specialInstructions: ''
  });

  useEffect(() => {
    // Get volunteers from localStorage (from FindVolunteers page)
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    
    // Try to find by _id (MongoDB) or id (fallback)
    const found = volunteers.find(v => v._id === id || v.id === parseInt(id));
    
    if (found) {
      setVolunteer(found);
    } else {
      toast.error('Volunteer not found');
      navigate('/find-volunteers');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleConfirmBooking = () => {
    if (!bookingDetails.date) {
      toast.error('Please select a date');
      return;
    }
    if (!bookingDetails.time) {
      toast.error('Please select a time');
      return;
    }
    if (!bookingDetails.address) {
      toast.error('Please enter your address');
      return;
    }
    setShowConfirmPopup(true);
  };

  const handleYesConfirm = () => {
    setShowConfirmPopup(false);
    
    // Save booking to localStorage
    const newBooking = {
      id: Date.now(),
      volunteerId: volunteer._id || volunteer.id,
      volunteerName: volunteer.name,
      volunteerPhone: volunteer.phone,
      service: volunteer.skills?.[0] || volunteer.category || 'General',
      date: bookingDetails.date,
      time: bookingDetails.time,
      address: bookingDetails.address,
      specialInstructions: bookingDetails.specialInstructions,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    const existingBookings = localStorage.getItem('userBookings');
    const bookings = existingBookings ? JSON.parse(existingBookings) : [];
    bookings.push(newBooking);
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    
    // Add to volunteer requests
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    const volunteerRequest = {
      id: Date.now(),
      userId: currentUser.id || 'user_' + Date.now(),
      userName: currentUser.name || 'Community Member',
      userPhone: currentUser.phone || '',
      userAddress: bookingDetails.address,
      date: bookingDetails.date,
      time: bookingDetails.time,
      service: volunteer.skills?.[0] || volunteer.category || 'General',
      specialInstructions: bookingDetails.specialInstructions,
      status: 'pending'
    };
    
    const existingRequests = localStorage.getItem('volunteerRequests');
    const requests = existingRequests ? JSON.parse(existingRequests) : [];
    requests.push(volunteerRequest);
    localStorage.setItem('volunteerRequests', JSON.stringify(requests));
    
    setShowSuccessPopup(true);
  };

  const handleOk = () => {
    setShowSuccessPopup(false);
    toast.success(`Request sent to ${volunteer?.name}!`);
    navigate('/user-dashboard');
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  if (!volunteer) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        
        <div className="booking-card">
          <h1>Book a Service</h1>
          
          <div className="volunteer-info">
            <div className="volunteer-avatar">{volunteer.name?.charAt(0) || 'V'}</div>
            <div className="volunteer-details">
              <h3>{volunteer.name}</h3>
              <p>⭐ {volunteer.rating || 4.5} • {volunteer.servicesCompleted || 0}+ services • {volunteer.experience || 0} years exp</p>
              <p><FaPhone /> {volunteer.phone}</p>
            </div>
          </div>
          
          <div className="booking-form">
            <div className="form-group">
              <label><FaCalendarAlt /> Select Date</label>
              <input type="date" name="date" value={bookingDetails.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
            </div>
            
            <div className="form-group">
              <label><FaClock /> Select Time</label>
              <input type="time" name="time" value={bookingDetails.time} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label><FaMapMarkerAlt /> Service Address</label>
              <textarea name="address" value={bookingDetails.address} onChange={handleChange} rows="3" placeholder="Enter your complete address" />
              <small>Your registered address is auto-filled. You can modify if needed.</small>
            </div>
            
            <div className="form-group">
              <label>Special Instructions (Optional)</label>
              <textarea name="specialInstructions" value={bookingDetails.specialInstructions} onChange={handleChange} rows="2" placeholder="Any special requirements..." />
            </div>
            
            <button className="confirm-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
          </div>
        </div>
      </div>
      
      <Modal isOpen={showConfirmPopup} onRequestClose={handleCancel} className="modal" overlayClassName="modal-overlay">
        <div className="modal-content">
          <h2>Confirm Booking</h2>
          <p>Are you sure you want to book <strong>{volunteer?.name}</strong>?</p>
          <div className="modal-buttons">
            <button className="modal-cancel" onClick={handleCancel}>Cancel</button>
            <button className="modal-confirm" onClick={handleYesConfirm}>Yes, Book Now</button>
          </div>
        </div>
      </Modal>
      
      <Modal isOpen={showSuccessPopup} onRequestClose={() => setShowSuccessPopup(false)} className="modal" overlayClassName="modal-overlay">
        <div className="modal-content success-modal">
          <FaCheckCircle className="success-icon" />
          <h2>Request Sent!</h2>
          <p>Your request has been sent to <strong>{volunteer?.name}</strong>.</p>
          <button className="gotit-btn" onClick={handleOk}>OK</button>
        </div>
      </Modal>
    </div>
  );
};

export default Booking;