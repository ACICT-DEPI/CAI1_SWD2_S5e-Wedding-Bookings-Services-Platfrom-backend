const Payment = require('../models/payment.model'); // Adjust the path as necessary

// Function to create a new payment
const createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('bookingId userId');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findById(id).populate('bookingId userId');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update payment status
const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;
  
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(id, { paymentStatus }, { new: true });
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
};
