const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all volunteers (including new ones)
router.get('/', async (req, res) => {
  try {
    // Get ALL volunteers - no filter
    const volunteers = await User.find({ role: 'volunteer' }).select('-password');
    res.json(volunteers);
  } catch (err) {
    console.error('Error fetching volunteers:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single volunteer by ID
router.get('/:id', async (req, res) => {
  try {
    const volunteer = await User.findOne({ _id: req.params.id, role: 'volunteer' }).select('-password');
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json(volunteer);
  } catch (err) {
    console.error('Error fetching volunteer:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;