const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, phone, password, role } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or phone' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Basic user data
    const userData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      role: req.body.role,
      age: req.body.age,
      gender: req.body.gender,
      aadharLast4: req.body.aadharLast4,
      experience: req.body.experience,
      skills: req.body.skills,
    };
    
    // Add role-specific data
    if (role === 'user') {
      // Resident data
      userData.address = req.body.address;
      userData.emergencyContact = req.body.emergencyContact;
      userData.emergencyPhone = req.body.emergencyPhone;
      userData.medicalConditions = req.body.medicalConditions;
    } else if (role === 'volunteer') {
      // Volunteer data - THIS MAKES NEW VOLUNTEERS APPEAR
      userData.verified = true;
      userData.serviceAreas = req.body.serviceAreas;
      userData.travelDistance = req.body.travelDistance;
      userData.preferredAreas = req.body.preferredAreas;
      userData.availability = req.body.availability;
      userData.servicesCompleted = 0;
      userData.rating = 0;
    }
    
    const user = new User(userData);
    await user.save();
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    if (user.role !== role) {
      return res.status(400).json({ message: `You are registered as ${user.role}. Please select correct role.` });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        skills: user.skills,
        experience: user.experience,
        serviceAreas: user.serviceAreas,
        availability: user.availability,
        verified: user.verified
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DEBUG: Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

module.exports = router;