const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get bookings for a resident
router.get('/resident/:residentId', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ residentId: req.params.residentId })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bookings for a volunteer
router.get('/volunteer/:volunteerId', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ volunteerId: req.params.volunteerId })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept a booking
router.put('/:id/accept', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete a booking
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;