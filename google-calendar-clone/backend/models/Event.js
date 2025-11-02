/**
 * ============================================
 * EVENT MODEL - DATABASE SCHEMA
 * ============================================
 * 
 * This file defines the Event data structure in MongoDB.
 * 
 * Fields:
 * - title (String, required)      - Event title/name
 * - description (String, required) - Event description
 * - date (Date, required)          - Event date and time
 * - createdAt (Date, auto)         - When record was created
 * - updatedAt (Date, auto)         - When record was last updated
 * 
 * The toJSON() method customizes how the data is returned,
 * converting MongoDB's _id to a simpler 'id' field.
 */

const mongoose = require('mongoose');

// Define the Event schema (database structure)
const eventSchema = new mongoose.Schema(
  {
    // Event title (e.g., "Team Meeting")
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,  // Remove extra spaces
    },
    
    // Event description (e.g., "Discuss project progress")
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    
    // Event date and time
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Customize how the event is converted to JSON
// This makes the API response cleaner
eventSchema.methods.toJSON = function () {
  const event = this.toObject();
  
  // Convert MongoDB's _id to a simpler 'id'
  event.id = event._id.toString();
  
  // Remove MongoDB internal fields
  delete event._id;
  delete event.__v;
  
  return event;
};

// Create and export the Event model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

