import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getProfile = () => api.get('/auth/profile');
export const updateProfile = (data) => api.put('/auth/profile', data);

// Volunteer APIs
export const getVolunteers = (params) => api.get('/volunteers', { params });
export const getVolunteerById = (id) => api.get(`/volunteers/${id}`);
export const becomeVolunteer = (data) => api.post('/volunteers', data);
export const updateVolunteerProfile = (id, data) => api.put(`/volunteers/${id}`, data);

// Booking APIs
export const createBooking = (data) => api.post('/bookings', data);
export const getUserBookings = () => api.get('/bookings/user');
export const getVolunteerBookings = () => api.get('/bookings/volunteer');
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}/status`, { status });
export const cancelBooking = (id) => api.delete(`/bookings/${id}`);

// Category APIs
export const getCategories = () => api.get('/categories');
export const getVolunteersByCategory = (categoryId) => api.get(`/categories/${categoryId}/volunteers`);

// Review APIs
export const addReview = (data) => api.post('/reviews', data);
export const getVolunteerReviews = (volunteerId) => api.get(`/reviews/volunteer/${volunteerId}`);

export default api;