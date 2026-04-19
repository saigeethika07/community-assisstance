import React from 'react';
import { FaHeart, FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div><h3 style={styles.title}>Community Connect</h3><p style={styles.desc}>Connecting communities through service and compassion. Making India a better place, one helping hand at a time.</p></div>
          <div><h3 style={styles.title}>Quick Links</h3><ul style={styles.links}><li><a href="/find-volunteers" style={styles.link}>Find Volunteers</a></li><li><a href="/about" style={styles.link}>About Us</a></li></ul></div>
          <div><h3 style={styles.title}>Services</h3><ul style={styles.links}><li><a href="/find-volunteers?category=Elder%20Care" style={styles.link}>Elder Care</a></li><li><a href="/find-volunteers?category=Child%20Care" style={styles.link}>Child Care</a></li><li><a href="/find-volunteers?category=House%20Cleaning" style={styles.link}>House Cleaning</a></li></ul></div>
          <div><h3 style={styles.title}>Connect</h3><div style={styles.social}><a href="#" style={styles.socialIcon}><FaFacebook /></a><a href="#" style={styles.socialIcon}><FaTwitter /></a><a href="#" style={styles.socialIcon}><FaInstagram /></a><a href="#" style={styles.socialIcon}><FaEnvelope /></a></div><p style={styles.contact}><FaPhone /> Helpline: <strong>1800-123-4357</strong></p><p style={styles.contact}>📧 Email: support@communityconnect.com</p><p style={styles.contact}>🇮🇳 National Helpline: <strong>1800-11-1234</strong></p></div>
        </div>
        <div style={styles.bottom}><p>Made with <FaHeart style={styles.heart} /> for India | © 2024 Community Connect. All rights reserved.</p></div>
      </div>
    </footer>
  );
};

const styles = {
  footer: { background: '#1e293b', color: 'white', padding: '50px 0 20px', marginTop: 'auto' },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '40px' },
  title: { fontSize: '18px', marginBottom: '15px', color: '#FF9933' },
  desc: { color: '#94a3b8', lineHeight: '1.6', fontSize: '14px' },
  links: { listStyle: 'none', padding: 0 },
  link: { color: '#94a3b8', textDecoration: 'none', display: 'block', marginBottom: '10px', fontSize: '14px' },
  social: { display: 'flex', gap: '15px', marginBottom: '20px' },
  socialIcon: { color: 'white', fontSize: '20px' },
  contact: { color: '#94a3b8', marginBottom: '10px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' },
  bottom: { textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #334155', color: '#94a3b8', fontSize: '13px' },
  heart: { color: '#ef4444', display: 'inline-block', margin: '0 5px' }
};

export default Footer;