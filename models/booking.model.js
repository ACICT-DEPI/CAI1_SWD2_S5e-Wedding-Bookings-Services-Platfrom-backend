const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  eventDate: { type: Date, required: true },
  address: { type: String },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
  amount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
