const ServiceRequest = require('../models/ServiceRequest');
const Staff = require('../models/Staff');
const { validationResult } = require('express-validator');

const createRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, details, images } = req.body;
    const ownerId = req.user.userId;

    const request = new ServiceRequest({
      ownerId,
      type,
      details,
      images: images || []
    });

    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate('ownerId', 'name email phone apartmentNumber address')
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const requests = await ServiceRequest.find({ ownerId })
      .skip(skip)
      .limit(limit);

    const total = await ServiceRequest.countDocuments({ ownerId });

    res.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo } = req.body;

    const request = await ServiceRequest.findByIdAndUpdate(
      id,
      { status, assignedTo, updatedAt: new Date() },
      { new: true }
    ).populate('ownerId', 'name email phone');

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await ServiceRequest.findById(id);

    if (req.user.role !== 'admin' && request.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await ServiceRequest.findByIdAndDelete(id);
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getMyRequests,
  updateRequest,
  deleteRequest
};
