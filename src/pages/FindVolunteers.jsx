import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaSearch, FaStar, FaMapMarkerAlt, FaCheckCircle, FaPhone, FaCalendarAlt, FaUserCheck, FaFilter } from 'react-icons/fa';
import { getVolunteers } from '../utils/api';
import toast from 'react-hot-toast';
import '../styles/FindVolunteers.css';

const FindVolunteers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [volunteers, setVolunteers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Elder Care', 'Child Care', 'House Cleaning', 'House Repairs', 'Tutoring', 'Cooking Help', 'Medical Assistance', 'Grocery Shopping'];

  const communityAreas = [
    "Brodipet", "Lakshmipuram", "Kothapet", "Pattabhipuram", "Guntur Vari Thota", "Nallapadu",
    "Chandramouli Nagar", "Arundelpet", "Vidya Nagar", "Srinivasa Nagar", "Sambasiva Pet",
    "Pedda Kakani", "Etukuru", "Gorantla", "Ankireddypalem", "Budampadu", "Chinna Kakani",
    "Takkellapadu", "Koritepadu", "Suryalanka", "Reddy Palem", "Autonagar", "Brindavan Gardens", "Railpet"
  ];

  // FETCH VOLUNTEERS FROM BACKEND - REPLACED hardcoded data
  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
  try {
    const response = await getVolunteers();
    setVolunteers(response.data);
    setFiltered(response.data);
    localStorage.setItem('volunteers', JSON.stringify(response.data)); // ADD THIS LINE
  } catch (err) {
    console.error('Error fetching volunteers:', err);
    toast.error('Failed to load volunteers');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    let results = volunteers;
    if (selectedCategory !== 'all') {
      results = results.filter(v => v.skills?.includes(selectedCategory));
    }
    if (selectedLocation !== 'all') {
      results = results.filter(v => v.serviceAreas?.includes(selectedLocation));
    }
    if (searchTerm) {
      results = results.filter(v => 
        v.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        v.serviceAreas?.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFiltered(results);
  }, [searchTerm, selectedCategory, selectedLocation, volunteers]);

  const handleBookNow = (volunteer) => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }
    navigate(`/volunteer/${volunteer._id}`, { state: { volunteer } });
  };

  return (
    <div className="find-volunteers-page">
      <div className="find-volunteers-container">
        <div className="page-header">
          <h1 className="page-title">Find Volunteers</h1>
          <p className="page-subtitle">Connect with trusted volunteers in your Guntur community</p>
        </div>
        
        <div className="search-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search by name or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          
          <div className="category-filter">
            <FaFilter className="filter-icon" />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
            </select>
          </div>
          
          <div className="location-filter">
            <FaMapMarkerAlt className="filter-icon" />
            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="all">All Locations</option>
              {communityAreas.map(area => <option key={area} value={area}>{area}</option>)}
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="loading-state">Loading volunteers...</div>
        ) : (
          <>
            <div className="results-info">Found {filtered.length} dedicated volunteers in Guntur</div>
            <div className="volunteers-grid">
              {filtered.map(v => (
                <div key={v._id} className="volunteer-card">
                  <div className="card-header">
                    <div className="volunteer-avatar">{v.name?.charAt(0) || 'V'}</div>
                    <div className="volunteer-info">
                      <h3>{v.name} {v.verified && <FaCheckCircle className="verified-icon" />}</h3>
                      <p><FaMapMarkerAlt /> {v.serviceAreas?.join(', ') || 'Guntur'}</p>
                      <p><FaPhone /> {v.phone}</p>
                    </div>
                  </div>
                  <div className="card-rating">
                    {[...Array(5)].map((_, i) => (<FaStar key={i} className={i < Math.floor(v.rating || 4.5) ? 'star filled' : 'star'} />))}
                    <span>{v.rating || 4.5} ({v.servicesCompleted || 0} reviews)</span>
                  </div>
                  <div className="card-category"><span className="category-tag">{v.skills?.[0] || 'General'}</span></div>
                  <p className="card-bio">{v.bio || `Experienced volunteer with ${v.experience || 0}+ years of service`}</p>
                  <div className="card-stats">
                    <span><FaCalendarAlt /> {v.availability || 'Flexible'}</span>
                    <span>⭐ {v.experience || 0}+ years</span>
                    <span><FaUserCheck /> {v.servicesCompleted || 0}+ services</span>
                  </div>
                  <button className="view-btn" onClick={() => handleBookNow(v)}>Book Now →</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FindVolunteers;