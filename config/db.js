const mongoose = require('mongoose');
const Contact = require('../models/contactModel');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
 
    mongoose.connection.once('open', async () => {
      try {
   
        await mongoose.connection.collection('contacts').dropIndexes();
        console.log('Old indexes dropped');
 
        await Contact.init();
        console.log('New indexes created');
      } catch (err) {
        console.error('Error rebuilding indexes:', err.message);
      }
    });

  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;