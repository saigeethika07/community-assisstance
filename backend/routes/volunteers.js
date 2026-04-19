const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await User.find({ role: 'volunteer', verified: true })
      .select('-password');
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single volunteer by ID
router.get('/:id', async (req, res) => {
  try {
    const volunteer = await User.findOne({ _id: req.params.id, role: 'volunteer' })
      .select('-password');
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;