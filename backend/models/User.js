const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'volunteer'], required: true },
  age: { type: Number },
  gender: { type: String },
  address: {
    doorNumber: String,
    flatNumber: String,
    buildingName: String,
    street: String,
    landmark: String,
    communityArea: String,
    pincode: String,
    fullAddress: String
  },
  serviceAreas: [String],
  travelDistance: String,
  preferredAreas: String,
  availability: String,
  aadharLast4: String,
  experience: String,
  skills: [String],
  servicesCompleted: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  emergencyContact: String,
  emergencyPhone: String,
  medicalConditions: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);