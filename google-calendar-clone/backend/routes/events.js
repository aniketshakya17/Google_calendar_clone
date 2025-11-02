/**
 * ============================================
 * EVENT ROUTES - RESTful API Endpoints
 * ============================================
 * 
 * This file handles all HTTP requests related to events.
 * 
 * Endpoints:
 * - GET    /api/events       - Get all events (sorted by date)
 * - GET    /api/events/:id   - Get single event by ID
 * - POST   /api/events       - Create new event
 * - PUT    /api/events/:id   - Update existing event
 * - DELETE /api/events/:id   - Delete event
 * 
 * Request/Response formats are JSON.
 */

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const dayjs = require('dayjs');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    
    // Convert dates to ISO strings
    const formattedEvents = events.map((event) => ({
      id: event.id,
      date: dayjs(event.date).toISOString(),
      title: event.title,
      description: event.description,
    }));

    res.json(formattedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid event ID format' });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const formattedEvent = {
      id: event.id,
      date: dayjs(event.date).toISOString(),
      title: event.title,
      description: event.description,
    };

    res.json(formattedEvent);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create new event
router.post('/', async (req, res) => {
  try {
    const { title, description, date, time } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Title, description, and date are required' });
    }

    let dateTime;
    if (time) {
      dateTime = new Date(`${date}T${time}:00`);
    } else {
      dateTime = new Date(date);
    }

    const event = new Event({
      title,
      description,
      date: dateTime,
    });

    const savedEvent = await event.save();

    const formattedEvent = {
      id: savedEvent.id,
      date: dayjs(savedEvent.date).toISOString(),
      title: savedEvent.title,
      description: savedEvent.description,
    };

    res.status(201).json({ success: true, event: formattedEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time } = req.body;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid event ID format' });
    }

    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Title, description, and date are required' });
    }

    let dateTime;
    if (time) {
      dateTime = new Date(`${date}T${time}:00`);
    } else {
      dateTime = new Date(date);
    }

    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date: dateTime,
      },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const formattedEvent = {
      id: event.id,
      date: dayjs(event.date).toISOString(),
      title: event.title,
      description: event.description,
    };

    res.json({ success: true, event: formattedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid event ID format' });
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
