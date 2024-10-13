const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, getBookingsByUserId, getBookingById, updateBooking, deleteBooking } = require('../controllers/booking.controller');


const { protectedAPIRoutes } = require("../middleware/auth");

// Save a booking
router.post("/bookings", protectedAPIRoutes, async (req, res) => {
    const { serviceId, eventDate, address, amount } = req.body;
    const userId = req.user.id; // Get user ID from the token
  
    try {
      const newBooking = new Booking({
        userId,
        serviceId,
        eventDate,
        address,
        amount,
      });
  
      await newBooking.save(); // Save the booking to the database
      res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Error creating booking", error });
    }
  });




// Route to create a new booking
router.post('/', createBooking);

router.get('/', getAllBookings);

router.get('/me/bookings', protectedAPIRoutes, getBookingsByUserId);

router.get('/:id', getBookingById);

router.put('/:id', updateBooking);

router.delete('/:id', deleteBooking);

router.get('/api/bookings/check-date', async (req, res) => {
    const { eventDate, serviceId } = req.query;
  
    try {
      const existingBooking = await Booking.findOne({ eventDate, serviceId });
      if (existingBooking) {
        return res.status(400).json({ message: 'This date is already booked.' });
      }
      res.status(200).json({ message: 'Date is available.' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  



module.exports = router;