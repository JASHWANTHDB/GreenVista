const express = require('express');
const authMiddleware = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');
const Invoice = require('../models/Invoice');

const router = express.Router();

router.get('/debug/all', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('ownerId', 'name email');
    res.json({ count: invoices.length, invoices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/debug/my', authMiddleware, async (req, res) => {
  try {
    console.log('Debug /my endpoint - req.user:', req.user);
    const invoices = await Invoice.find({ ownerId: req.user.userId }).populate('ownerId', 'name email');
    res.json({ 
      userId: req.user.userId, 
      count: invoices.length, 
      invoices 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { ownerId, amount, dueDate } = req.body;
    if (!ownerId || !amount || !dueDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const invoice = new Invoice({ ownerId, amount, dueDate });
    await invoice.save();
    await invoice.populate('ownerId', 'name email phone address');
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    console.log('Invoices GET - req.user:', req.user);
    console.log('User role:', req.user.role);
    if (req.user.role === 'owner') {
      query = { ownerId: req.user.userId };
      console.log('Owner query:', query);
    }

    const invoices = await Invoice.find(query)
      .populate('ownerId', 'name email phone address');
    
    console.log('Found invoices:', invoices.length);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/pay', authMiddleware, isAdmin, async (req, res) => {
  try {
    console.log('Mark paid request for invoice ID:', req.params.id);
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      console.log('Invoice not found with ID:', req.params.id);
      return res.status(404).json({ error: 'Invoice not found' });
    }
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { paid: true, paymentTxId: `TXN-${Date.now()}` },
      { new: true }
    ).populate('ownerId', 'name email phone address');
    console.log('Invoice marked as paid:', updatedInvoice._id);
    res.json(updatedInvoice);
  } catch (error) {
    console.error('Error marking invoice as paid:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
