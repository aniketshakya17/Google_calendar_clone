/**
 * ============================================
 * EXPRESS SERVER - ENTRY POINT
 * ============================================
 * 
 * This is the main server file that:
 * - Sets up Express.js application
 * - Configures middleware (CORS, JSON parsing)
 * - Connects to MongoDB database
 * - Defines API routes
 * - Starts the server
 * 
 * API Endpoints:
 * - GET  /api/health       - Server health check
 * - GET  /api/events       - Get all events
 * - GET  /api/events/:id   - Get single event
 * - POST /api/events       - Create new event
 * - PUT  /api/events/:id   - Update event
 * - DELETE /api/events/:id - Delete event
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');
const eventsRoutes = require('./routes/events');

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================
// CORS: Allow frontend to make requests from different origin
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ============================================
// DATABASE CONNECTION
// ============================================
// Connect to MongoDB (non-blocking - server continues even if connection fails)
connectDB().catch((err) => {
  console.error('MongoDB connection error:', err.message);
  console.log('Server will continue but database operations may fail.');
  console.log('Make sure MongoDB is running or update .env with MongoDB Atlas connection string.');
});

// ============================================
// API ROUTES
// ============================================
// All event-related routes (CRUD operations)
app.use('/api/events', eventsRoutes);

// Health check endpoint - Test if server is running
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    database: 'MongoDB',
    port: PORT
  });
});

// Root endpoint - API information
app.get('/', (req, res) => {
  res.json({ 
    message: 'Google Calendar Clone API', 
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      events: '/api/events'
    }
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`\n✅ Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 API Base: http://localhost:${PORT}/api\n`);
});
