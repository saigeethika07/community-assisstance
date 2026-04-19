import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import FindVolunteers from './pages/FindVolunteers';
import VolunteerProfile from './pages/VolunteerProfile';
import Booking from './pages/Booking';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const data = localStorage.getItem('userData');
    
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
      if (data) setUserData(JSON.parse(data));
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Toaster position="top-right" />
        
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} setUserData={setUserData} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userRole={userRole} userData={userData} />
            <Routes>
              {/* Home page shows different content based on role */}
              <Route path="/" element={
                userRole === 'user' ? 
                  <Home userData={userData} /> : 
                  <VolunteerDashboard userData={userData} />
              } />
              <Route path="/user-dashboard" element={userRole === 'user' ? <UserDashboard userData={userData} /> : <Navigate to="/" />} />
              <Route path="/volunteer-dashboard" element={userRole === 'volunteer' ? <VolunteerDashboard userData={userData} /> : <Navigate to="/" />} />
              <Route path="/find-volunteers" element={<FindVolunteers />} />
              <Route path="/volunteer/:id" element={<VolunteerProfile />} />
              <Route path="/booking/:id" element={<Booking userData={userData} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;