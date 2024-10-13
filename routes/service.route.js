const express = require('express');
const router = express.Router();
const { createService, getAllServices, getServiceById,updateService, deleteService, getServicesByCategory } = require('../controllers/service.controller');

// Route to create a new service provider
router.post('/', createService);

router.get('/', getAllServices);

router.get('/:id', getServiceById);

router.put('/:id', updateService);

router.delete('/:id', deleteService);

router.get('/category/:categoryId', getServicesByCategory);




module.exports = router;
