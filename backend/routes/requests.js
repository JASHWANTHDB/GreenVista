const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');
const {
  createRequest,
  getRequests,
  getMyRequests,
  updateRequest,
  deleteRequest
} = require('../controllers/requestController');

const router = express.Router();

// Get my requests - MUST come before generic routes
router.get('/my', authMiddleware, getMyRequests);

// Get all requests (admin only)
router.get('/', authMiddleware, isAdmin, getRequests);

// Create request
router.post(
  '/',
  authMiddleware,
  [
    body('type').notEmpty().withMessage('Type is required'),
    body('details').notEmpty().withMessage('Details are required')
  ],
  createRequest
);

// Update request
router.put('/:id', authMiddleware, isAdmin, updateRequest);

// Delete request
router.delete('/:id', authMiddleware, deleteRequest);

module.exports = router;
