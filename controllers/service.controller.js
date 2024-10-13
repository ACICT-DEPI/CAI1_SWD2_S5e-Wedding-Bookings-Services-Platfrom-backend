const Service = require('../models/service.model');

// Create a new service
const createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('category'); // Populating category for referenced field
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('category');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getServicesByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params; // Get the category ID from the request parameters
      const services = await Service.find({ category: categoryId }).populate('category'); // Find services by category
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
getServicesByCategory,
};