const express = require('express');
const {createPayment,getAllPayments,getPaymentById,updatePaymentStatus} = require('../controllers/payment.controller');

const router = express.Router();

// Create a new payment
router.post('/payments', createPayment);

// Get all payments
router.get('/payments', getAllPayments);

// Get payment by ID
router.get('/payments/:id', getPaymentById);

// Update payment status
router.put('/payments/:id/status', updatePaymentStatus);

module.exports = router;
