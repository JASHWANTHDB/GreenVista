require('dotenv').config();
const mongoose = require('mongoose');
const Invoice = require('./models/Invoice');
const User = require('./models/User');

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');
    
    const invoices = await Invoice.find().populate('ownerId', 'name email _id');
    console.log('=== ALL INVOICES ===');
    invoices.forEach(inv => {
      console.log(`Amount: ${inv.amount}, Owner: ${inv.ownerId?.name}, OwnerID: ${inv.ownerId?._id}, Paid: ${inv.paid}`);
    });
    
    const owners = await User.find({ role: 'owner' }, 'name email _id');
    console.log('\n=== ALL OWNERS ===');
    owners.forEach(owner => {
      console.log(`Name: ${owner.name}, Email: ${owner.email}, ID: ${owner._id}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

check();
