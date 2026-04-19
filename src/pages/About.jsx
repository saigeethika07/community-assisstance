import React from 'react';
import { FaHandsHelping, FaUsers, FaHeart, FaGlobe } from 'react-icons/fa';

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>About SevaSetu</h1>
        <p style={styles.subtitle}>Bridging communities through service and compassion</p>
      </div>
      
      <div style={styles.content}>
        <div style={styles.mission}>
          <h2>Our Mission</h2>
          <p>
            SevaSetu is dedicated to creating a network of compassionate volunteers and community members 
            who need assistance. We believe that every act of kindness, no matter how small, can make a 
            significant difference in someone's life. Our platform connects those who need help with those 
            who are willing to give it, fostering stronger, more resilient communities across India.
          </p>
        </div>
        
        <div style={styles.stats}>
          <div style={styles.stat}>
            <FaUsers style={styles.statIcon} />
            <h3>10,000+</h3>
            <p>Active Users</p>
          </div>
          <div style={styles.stat}>
            <FaHandsHelping style={styles.statIcon} />
            <h3>5,000+</h3>
            <p>Volunteers</p>
          </div>
          <div style={styles.stat}>
            <FaHeart style={styles.statIcon} />
            <h3>98%</h3>
            <p>Satisfaction Rate</p>
          </div>
          <div style={styles.stat}>
            <FaGlobe style={styles.statIcon} />
            <h3>50+</h3>
            <p>Cities Covered</p>
          </div>
        </div>
        
        <div style={styles.values}>
          <h2>Our Core Values</h2>
          <div style={styles.valuesGrid}>
            <div style={styles.valueCard}>
              <h3>Trust & Safety</h3>
              <p>All volunteers are verified and background-checked for your safety.</p>
            </div>
            <div style={styles.valueCard}>
              <h3>Compassion</h3>
              <p>We believe in the power of kindness and empathy in every interaction.</p>
            </div>
            <div style={styles.valueCard}>
              <h3>Community First</h3>
              <p>Building stronger communities through mutual support and cooperation.</p>
            </div>
            <div style={styles.valueCard}>
              <h3>Accessibility</h3>
              <p>Making help accessible to everyone, regardless of their background.</p>
            </div>
          </div>
        </div>
        
        <div style={styles.team}>
          <h2>Our Team</h2>
          <div style={styles.teamGrid}>
            <div style={styles.teamMember}>
              <img src="/images/team1.jpg" alt="Team member" style={styles.teamImage} />
              <h3>Rajesh Sharma</h3>
              <p>Founder & CEO</p>
            </div>
            <div style={styles.teamMember}>
              <img src="/images/team2.jpg" alt="Team member" style={styles.teamImage} />
              <h3>Priya Patel</h3>
              <p>Community Manager</p>
            </div>
            <div style={styles.teamMember}>
              <img src="/images/team3.jpg" alt="Team member" style={styles.teamImage} />
              <h3>Amit Kumar</h3>
              <p>Technical Lead</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  title: {
    fontSize: '48px',
    color: '#333',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '20px',
    color: '#666',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
  },
  mission: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    textAlign: 'center',
  },
  stat: {
    padding: '30px',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  statIcon: {
    fontSize: '40px',
    color: '#4F46E5',
    marginBottom: '15px',
  },
  values: {
    textAlign: 'center',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginTop: '30px',
  },
  valueCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  team: {
    textAlign: 'center',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginTop: '30px',
  },
  teamMember: {
    background: 'white',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  teamImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
  },
};

export default About;