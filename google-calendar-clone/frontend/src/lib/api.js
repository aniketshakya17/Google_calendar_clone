const API_BASE_URL = '/api';

export const api = {
  // Get all events
  getEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  },

  // Get event by ID
  getEvent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    return response.json();
  },

  // Create event
  createEvent: async (eventData) => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create event');
    }
    return response.json();
  },

  // Update event
  updateEvent: async (id, eventData) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update event');
    }
    return response.json();
  },

  // Delete event
  deleteEvent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete event');
    }
    return response.json();
  },
};

