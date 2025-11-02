# 📅 Google Calendar Clone - MERN Stack

A full-stack Google Calendar clone application built with **MERN Stack** (MongoDB, Express, React, Node.js).

## 🚀 Quick Start

👉 **New here?** Start with [START_HERE.md](START_HERE.md)

👉 **Want to run it?** See [QUICKSTART.md](QUICKSTART.md)

👉 **Want to understand code?** See [CODE_GUIDE.md](CODE_GUIDE.md)

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **HTML, CSS** - Markup and styling
- **Bootstrap 5** - CSS framework
- **Zustand** - State management
- **Day.js** - Date manipulation
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **RESTful APIs** - API architecture

## 📁 Project Structure

```
google-calendar-clone-main/
├── backend/              # Express.js + MongoDB backend
│   ├── server.js        # Main server (START HERE for backend)
│   ├── models/         # Database schemas
│   ├── routes/        # API routes
│   └── db/             # Database connection
│
└── frontend/            # React frontend
    ├── src/
    │   ├── App.jsx     # Main component (START HERE for frontend)
    │   ├── components/ # React components
    │   └── lib/        # Utilities and store
    └── public/         # Static assets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas)

### Installation & Run

#### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/google-calendar-clone
# PORT=5000

npm start
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### 3. Open Browser

```
http://localhost:3000
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get event by ID |
| POST | `/api/events` | Create new event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |
| GET | `/api/health` | Server status |

## ✨ Features

- ✅ **Month View** - Calendar month grid
- ✅ **Week View** - Weekly calendar with hours
- ✅ **Day View** - Daily calendar with hourly slots
- ✅ **Create Events** - Add new calendar events
- ✅ **View Events** - See event details
- ✅ **Update Events** - Edit existing events
- ✅ **Delete Events** - Remove events
- ✅ **Responsive Design** - Works on all devices
- ✅ **Bootstrap UI** - Modern, clean interface

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string and update `backend/.env`
4. Whitelist your IP address

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - Quick navigation guide
- **[QUICKSTART.md](QUICKSTART.md)** - Step-by-step setup
- **[CODE_GUIDE.md](CODE_GUIDE.md)** - Understanding the code
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Detailed structure


