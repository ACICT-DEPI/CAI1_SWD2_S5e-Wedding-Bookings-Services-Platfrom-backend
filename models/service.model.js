const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category model
  description: { type: String },
  location: {
    address: { type: String },
    city: { type: String },
    country: { type: String }
  },
  contact: {
    phone: { type: String },
    email: { type: String }
  },
  price: { type: Number, required: true },
  availability: { type: [Date] }, // Array of Date objects or a specific schedule format
  review: { type: String },
  images: { type: [String] }, // URLs or paths to images
});

module.exports = mongoose.model('Service', serviceSchema);