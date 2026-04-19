import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheckCircle, FaCalendarAlt, FaTrophy, FaUsers, FaClock, FaArrowLeft, FaAward, FaLanguage } from 'react-icons/fa';
import toast from 'react-hot-toast';
import '../styles/VolunteerProfile.css';

const VolunteerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get volunteer from location state (passed from FindVolunteers)
    if (location.state?.volunteer) {
      setVolunteer(location.state.volunteer);
      setLoading(false);
      return;
    }
    
    // Otherwise, get from localStorage
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    const found = volunteers.find(v => v._id === id || v.id === parseInt(id));
    
    if (found) {
      setVolunteer(found);
    } else {
      toast.error('Volunteer not found');
      navigate('/find-volunteers');
    }
    setLoading(false);
  }, [id, location, navigate]);

  const handleBookNow = () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      toast.error('Please login to book a volunteer');
      navigate('/login');
      return;
    }
    navigate(`/booking/${volunteer._id || volunteer.id}`);
  };

  if (loading) {
    return <div className="loading-spinner">Loading volunteer profile...</div>;
  }

  if (!volunteer) {
    return <div className="error-container">Volunteer not found</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Volunteers
        </button>
        
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{volunteer.name?.charAt(0) || 'V'}</div>
            <div className="profile-header-info">
              <h1>{volunteer.name} {volunteer.verified && <FaCheckCircle className="verified-icon" />}</h1>
              <div className="profile-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(volunteer.rating || 4.5) ? 'star filled' : 'star'} />
                ))}
                <span>{volunteer.rating || 4.5} ({volunteer.servicesCompleted || 0} reviews)</span>
              </div>
              <p><FaMapMarkerAlt /> {volunteer.serviceAreas?.join(', ') || volunteer.location || 'Guntur'}</p>
              <div className="profile-stats">
                <span><FaTrophy /> {volunteer.servicesCompleted || 0}+ Services</span>
                <span><FaUsers /> {volunteer.experience || 0}+ Years</span>
                <span><FaClock /> {volunteer.availability || 'Flexible'}</span>
              </div>
            </div>
          </div>
          
          <div className="profile-body">
            <div className="profile-main">
              <div className="info-section">
                <h2>About Me</h2>
                <p>{volunteer.bio || `Experienced volunteer with ${volunteer.experience || 0}+ years of service.`}</p>
              </div>
              
              <div className="info-section">
                <h2>Services</h2>
                <div className="skills-list">
                  {(volunteer.skills || [volunteer.category]).map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="info-section">
                <h2>Languages</h2>
                <div className="languages-list">
                  <span className="language-tag"><FaLanguage /> Telugu</span>
                  <span className="language-tag"><FaLanguage /> English</span>
                </div>
              </div>
            </div>
            
            <div className="profile-sidebar">
              <div className="contact-card">
                <h3>Contact Information</h3>
                <p><FaPhone /> {volunteer.phone}</p>
                <p><FaEnvelope /> {volunteer.email}</p>
                <div className="availability">
                  <h4>Availability</h4>
                  <p>{volunteer.availability || 'Flexible hours'}</p>
                </div>
                <button className="book-btn" onClick={handleBookNow}>
                  <FaCalendarAlt /> Book This Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;