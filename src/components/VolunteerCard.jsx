import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const VolunteerCard = ({ volunteer }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // JUST GO TO BOOKING PAGE - NO POPUP
    navigate(`/booking/${volunteer.id}`);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.avatar}>{volunteer.profileIcon}</div>
        <div style={styles.info}>
          <h3 style={styles.name}>{volunteer.name} {volunteer.verified && <FaCheckCircle style={styles.verified} />}</h3>
          <p style={styles.location}><FaMapMarkerAlt /> {volunteer.location}</p>
        </div>
      </div>
      <div style={styles.rating}>
        {[...Array(5)].map((_, i) => (<FaStar key={i} style={{ color: i < Math.floor(volunteer.rating) ? '#FFD700' : '#e2e8f0' }} />))}
        <span>{volunteer.rating} ({volunteer.servicesCompleted}+ reviews)</span>
      </div>
      <p style={styles.bio}>{volunteer.bio}</p>
      <div style={styles.stats}>
        <span>⭐ {volunteer.experience}+ years</span>
        <span>🎯 {volunteer.servicesCompleted}+ services</span>
      </div>
      <button style={styles.button} onClick={handleBookNow}>Book Now →</button>
    </div>
  );
};

const styles = {
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease',
  },
  header: { display: 'flex', gap: '15px', marginBottom: '15px' },
  avatar: { width: '60px', height: '60px', background: '#FF9933', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' },
  info: { flex: 1 },
  name: { fontSize: '18px', fontWeight: '600', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' },
  verified: { color: '#10b981', fontSize: '14px' },
  location: { fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' },
  rating: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' },
  bio: { color: '#475569', fontSize: '13px', marginBottom: '12px', lineHeight: '1.5' },
  stats: { display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '12px', color: '#64748b' },
  button: { width: '100%', padding: '10px', background: '#FF9933', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' },
};

export default VolunteerCard;