import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ icon, title, description, color, image }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/find-volunteers?category=${title}`);
  };

  return (
    <div className="category-card" onClick={handleSearch} style={styles.card}>
      <div style={{...styles.iconWrapper, background: color}}>
        <span style={styles.icon}>{icon}</span>
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      <button style={styles.button}>Find Help →</button>
    </div>
  );
};

const styles = {
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '25px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    margin: '0 auto 20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '40px',
  },
  title: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#1e293b',
  },
  description: {
    color: '#64748b',
    marginBottom: '15px',
    lineHeight: '1.5',
    fontSize: '14px',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#FF9933',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
};

export default CategoryCard;