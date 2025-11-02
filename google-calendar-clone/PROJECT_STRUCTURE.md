# Project Structure - MERN Stack

## 📂 Complete Directory Structure

```
google-calendar-clone-main/
│
├── backend/                          # Express.js + MongoDB Backend
│   ├── db/
│   │   └── connection.js            # MongoDB connection setup
│   ├── models/
│   │   └── Event.js                 # Mongoose Event model
│   ├── routes/
│   │   └── events.js                # RESTful API routes for events
│   ├── server.js                     # Express server entry point
│   ├── package.json                 # Backend dependencies
│   └── README.md                    # Backend documentation
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── img/                     # Static images
│   │       ├── calendar_*.png       # Calendar icons
│   │       ├── google-calendar.png
│   │       └── inst2.png           # Avatar image
│   ├── src/
│   │   ├── components/              # React Components
│   │   │   ├── header/             # Header components
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── left-side.jsx
│   │   │   │   └── right-side.jsx
│   │   │   ├── sidebar/            # Sidebar components
│   │   │   │   ├── SideBar.jsx
│   │   │   │   ├── create.jsx
│   │   │   │   ├── my-calendars.jsx
│   │   │   │   ├── search-users.jsx
│   │   │   │   └── side-bar-calendar.jsx
│   │   │   ├── add-time.jsx        # Time picker component
│   │   │   ├── day-view.jsx        # Day calendar view
│   │   │   ├── event-popover.jsx   # Event creation form
│   │   │   ├── event-renderer.jsx  # Event display component
│   │   │   ├── event-summary-popover.jsx # Event details modal
│   │   │   ├── MainView.jsx        # Main calendar container
│   │   │   ├── month-view.jsx       # Month calendar view
│   │   │   ├── month-view-box.jsx  # Individual day cell
│   │   │   ├── svg-icons.jsx       # SVG icon components
│   │   │   └── week-view.jsx        # Week calendar view
│   │   ├── lib/                     # Utilities
│   │   │   ├── api.js              # API functions
│   │   │   ├── getTime.js          # Date/time utilities
│   │   │   └── store.js            # Zustand state management
│   │   ├── App.jsx                  # Main React component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css               # Global styles
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   ├── package.json                 # Frontend dependencies
│   └── README.md                    # Frontend documentation
│
├── README.md                         # Main project documentation
├── QUICKSTART.md                     # Quick start guide
└── .gitignore                        # Git ignore file
```

## 🎯 Technology Breakdown

### Backend (`/backend`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **APIs**: RESTful

### Frontend (`/frontend`)
- **Framework**: React (Vite)
- **Styling**: Bootstrap 5 + CSS
- **State Management**: Zustand
- **Date Handling**: Day.js
- **Icons**: React Icons + Lucide React

## 🔄 Data Flow

```
User Interaction (Frontend)
    ↓
React Components
    ↓
API Calls (lib/api.js)
    ↓
HTTP Requests to Backend
    ↓
Express Routes (routes/events.js)
    ↓
Mongoose Models (models/Event.js)
    ↓
MongoDB Database
```

## 📦 Key Files

### Backend
- `server.js` - Express server setup and middleware
- `routes/events.js` - CRUD operations for events
- `models/Event.js` - Event schema definition
- `db/connection.js` - MongoDB connection logic

### Frontend
- `src/App.jsx` - Main application component
- `src/lib/store.js` - Global state management
- `src/lib/api.js` - API integration functions
- `src/components/MainView.jsx` - Calendar view controller

## 🚀 Getting Started

1. **Backend**: `cd backend && npm install && npm start`
2. **Frontend**: `cd frontend && npm install && npm run dev`
3. **Database**: Configure MongoDB connection in `backend/.env`

---

**Pure MERN Stack** - No Next.js, TypeScript, or other frameworks! ✨

