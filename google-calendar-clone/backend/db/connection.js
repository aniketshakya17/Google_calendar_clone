/**
 * ============================================
 * MONGODB DATABASE CONNECTION
 * ============================================
 * 
 * This file handles connecting to MongoDB database.
 * 
 * What it does:
 * - Reads connection string from environment variables
 * - Connects to MongoDB (local or cloud/Atlas)
 * - Handles connection errors gracefully
 * 
 * Environment Variables (checked in order):
 * - MONGO_URI: Primary MongoDB connection string (MongoDB Atlas)
 * - MONGODB_URI: Alternative name for connection string
 * - DATABASE_URL: Alternative name for connection string
 * 
 * Default: mongodb://localhost:27017/google-calendar-clone
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Get connection string from .env file or use default
    const mongoURI = 
      process.env.MONGO_URI ||           // MongoDB Atlas connection (user provided)
      process.env.MONGODB_URI ||         // Alternative name
      process.env.DATABASE_URL ||        // Alternative name
      'mongodb://localhost:27017/google-calendar-clone';
    
    // Connect to MongoDB
    // Note: useNewUrlParser and useUnifiedTopology are deprecated in Mongoose 6+
    const conn = await mongoose.connect(mongoURI);

    // Success message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Error handling
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
