const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  residentName: { type: String, required: true },
  residentPhone: { type: String, required: true },
  residentAddress: { type: String, required: true },
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  volunteerName: { type: String, required: true },
  volunteerPhone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  specialInstructions: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);