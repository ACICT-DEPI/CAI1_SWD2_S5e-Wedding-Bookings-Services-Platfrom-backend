const Booking = require('../models/booking.model');

const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(200).json(booking);
     }
     catch (err) {
         res.status(500).json({message : err.message});
     }
};

// Get all Bookings (Optional: You can modify this to filter bookings for a specific user)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId').populate('serviceId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Bookings by User ID
const getBookingsByUserId = async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from the decoded token
      const bookings = await Booking.find({ userId }).populate("serviceId"); // Assuming userId field in Booking model
      res.status(200).json(bookings); // Respond with the bookings
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Error fetching bookings" });
    }
  };


// Get Booking by ID
const getBookingById = async (req, res) => {
  const { id } = req.params; // Get booking ID from URL parameters

  try {
    const booking = await Booking.findById(id).populate('serviceId').populate('userId'); // Populate serviceId with service data
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
    }
    catch (error) {
    res.status(500).json({ message: error.message });
    }
};

// Update a booking
const updateBooking = async (req, res) => {
  const { id } = req.params; // Get booking ID from URL parameters

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body , { new: true });   // Find booking by ID and update details    
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(updatedBooking);   
    }   
    catch (error) {
    res.status(400).json({ message: error.message });
    }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  const { id } = req.params; // Get booking ID from URL parameters

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id); // Find booking by ID and delete
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
    }
    catch (error) {
    res.status(500).json({ message: error.message });
    }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingsByUserId,
  getBookingById,
  updateBooking,
  deleteBooking,
};