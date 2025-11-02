# 📚 Code Guide - Understanding the Project

This guide helps you understand how the code is organized and how everything works together.

## 🗂️ Project Structure Overview

```
google-calendar-clone-main/
│
├── backend/           # Server-side code (Node.js + Express)
│   ├── server.js      # Main server file - START HERE
│   ├── db/
│   │   └── connection.js  # MongoDB connection
│   ├── models/
│   │   └── Event.js      # Database schema (what data looks like)
│   └── routes/
│       └── events.js     # API endpoints (CRUD operations)
│
└── frontend/          # Client-side code (React)
    ├── src/
    │   ├── App.jsx       # Main React component - START HERE
    │   ├── components/   # UI components (buttons, calendars, etc.)
    │   └── lib/          # Utilities and state management
    └── public/          # Images and static files
```

## 🔄 How Data Flows

### 1. User Clicks on Calendar → Creates Event

```
User clicks date
    ↓
EventPopover component opens
    ↓
User fills form and clicks Save
    ↓
Frontend calls: POST /api/events
    ↓
Backend receives request in routes/events.js
    ↓
Creates new Event using Event model
    ↓
Saves to MongoDB
    ↓
Returns saved event to frontend
    ↓
Frontend updates display
```

### 2. Page Loads → Displays Events

```
App.jsx component loads
    ↓
Calls: GET /api/events
    ↓
Backend fetches all events from MongoDB
    ↓
Returns array of events
    ↓
Frontend stores in Zustand store
    ↓
Components read from store and display
```

## 📁 File-by-File Explanation

### Backend Files

#### `backend/server.js`
- **Purpose**: Main entry point for the server
- **What it does**:
  - Starts Express server
  - Sets up middleware (CORS, JSON parsing)
  - Connects to MongoDB
  - Registers routes
- **Key concepts**: Middleware, Routes, Server setup

#### `backend/models/Event.js`
- **Purpose**: Defines what an Event looks like in the database
- **What it does**:
  - Creates schema (title, description, date)
  - Sets validation rules
  - Customizes how data is returned
- **Key concepts**: Mongoose Schema, Data validation

#### `backend/routes/events.js`
- **Purpose**: Handles all event-related API requests
- **What it does**:
  - GET `/api/events` - Get all events
  - GET `/api/events/:id` - Get one event
  - POST `/api/events` - Create event
  - PUT `/api/events/:id` - Update event
  - DELETE `/api/events/:id` - Delete event
- **Key concepts**: RESTful API, CRUD operations

#### `backend/db/connection.js`
- **Purpose**: Connects to MongoDB database
- **What it does**:
  - Reads connection string from .env
  - Connects to MongoDB
  - Handles connection errors
- **Key concepts**: Database connection, Environment variables

### Frontend Files

#### `frontend/src/App.jsx`
- **Purpose**: Main React component
- **What it does**:
  - Fetches events when page loads
  - Renders Header and MainView
  - Sets up global state
- **Key concepts**: React components, useEffect hook, State management

#### `frontend/src/lib/store.js`
- **Purpose**: Global state management
- **What it does**:
  - Stores all events
  - Manages view selection (Month/Week/Day)
  - Manages current date
  - Handles popover states
- **Key concepts**: Zustand, Global state, State persistence

#### `frontend/src/lib/api.js`
- **Purpose**: Functions to call backend API
- **What it does**:
  - Provides helper functions for API calls
  - Handles request/response
- **Key concepts**: API integration, Fetch API

#### `frontend/src/components/MainView.jsx`
- **Purpose**: Main calendar container
- **What it does**:
  - Shows Sidebar
  - Renders correct view (Month/Week/Day)
  - Manages event popovers
- **Key concepts**: Conditional rendering, Component composition

#### `frontend/src/components/month-view.jsx`
- **Purpose**: Month calendar grid
- **What it does**:
  - Creates 7x5 grid of days
  - Shows current month
  - Renders each day cell
- **Key concepts**: Array mapping, Grid layout

## 🔑 Key Concepts Explained

### RESTful API
- **GET**: Retrieve data
- **POST**: Create new data
- **PUT**: Update existing data
- **DELETE**: Remove data

### React Hooks
- **useState**: Store component-specific data
- **useEffect**: Run code when component loads/changes
- **Custom hooks**: Reusable state logic (from Zustand)

### State Management
- **Zustand**: Simple state management library
- **Global state**: Data accessible by all components
- **Local state**: Data specific to one component

### Database (MongoDB)
- **Collection**: Like a table (e.g., "events")
- **Document**: Like a row (e.g., one event)
- **Schema**: Defines structure of documents

## 🎯 Where to Start Learning

### If you're new to the project:

1. **Start with**: `frontend/src/App.jsx`
   - Simplest component
   - Shows how data is fetched

2. **Then read**: `backend/server.js`
   - Shows server setup
   - Easy to understand

3. **Next**: `backend/routes/events.js`
   - See how API endpoints work

4. **Finally**: Explore components
   - Start with simpler ones like `Header.jsx`
   - Then `month-view.jsx`

### If you want to add features:

1. **Add new API endpoint**: Edit `backend/routes/events.js`
2. **Add new component**: Create in `frontend/src/components/`
3. **Add new state**: Edit `frontend/src/lib/store.js`
4. **Add database field**: Edit `backend/models/Event.js`

## 💡 Common Tasks

### Add a new field to events:
1. Edit `backend/models/Event.js` - Add to schema
2. Edit `backend/routes/events.js` - Handle in create/update
3. Edit `frontend/src/lib/store.js` - Add to type
4. Edit `frontend/src/components/event-popover.jsx` - Add form field

### Add a new calendar view:
1. Create new component in `frontend/src/components/` (e.g., `year-view.jsx`)
2. Add view option in `frontend/src/components/header/right-side.jsx`
3. Add case in `frontend/src/components/MainView.jsx`
4. Add view logic in `frontend/src/lib/store.js`

## 🐛 Debugging Tips

1. **Check browser console**: Frontend errors appear here
2. **Check server console**: Backend errors appear here
3. **Test API directly**: Use browser or Postman to test endpoints
4. **Check MongoDB**: Verify data is being saved
5. **Network tab**: See API requests/responses in browser DevTools

## 📖 Next Steps

- Read code comments in each file
- Try modifying simple components first
- Test changes incrementally
- Use browser DevTools to inspect state

---

**Remember**: Start simple, test often, read error messages carefully!

