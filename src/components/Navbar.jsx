import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaUser, FaSignOutAlt, FaTachometerAlt, FaHome, FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = ({ isAuthenticated, setIsAuthenticated, userRole, userData }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}><FaHeart style={styles.logoIcon} /><span style={styles.logoText}>Community Connect</span></Link>
        
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}><FaHome /> Home</Link>
          <Link to="/find-volunteers" style={styles.navLink}><FaUsers /> Find Volunteers</Link>
          
          {isAuthenticated ? (
            <>
              <Link to={userRole === 'user' ? '/user-dashboard' : '/volunteer-dashboard'} style={styles.navLink}><FaTachometerAlt /> Dashboard</Link>
              <button onClick={handleLogout} style={styles.logoutBtn}><FaSignOutAlt /> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}><FaUser /> Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: { background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '1rem 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
  logo: { display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '10px' },
  logoIcon: { fontSize: '28px', color: '#FF9933' },
  logoText: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '25px', flexWrap: 'wrap' },
  navLink: { textDecoration: 'none', color: '#64748b', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px', transition: 'color 0.3s ease' },
  registerBtn: { background: '#FF9933', color: 'white', padding: '8px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' },
  logoutBtn: { background: '#ef4444', color: 'white', padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }
};

export default Navbar;