const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Credit Card', 'PayPal'], required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Failed'], default: 'Pending' },
  transactionId: { type: String },
});

module.exports = mongoose.model('Payment', paymentSchema);
