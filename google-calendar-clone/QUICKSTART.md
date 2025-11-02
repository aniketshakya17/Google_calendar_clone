# Quick Start Guide

Follow these steps to get the Google Calendar Clone running on your machine.

## Prerequisites Check

- ✅ Node.js (v18+) installed? Run `node --version`
- ✅ npm installed? Run `npm --version`
- ✅ MongoDB ready? (local or Atlas)

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the content below and update with your MongoDB connection string
```

Create `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/google-calendar-clone
PORT=5000
```

**For MongoDB Atlas users:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/google-calendar-clone
PORT=5000
```

```bash
# Start the backend server
npm start

# OR for development (auto-reload)
npm run dev
```

✅ Backend should be running on `http://localhost:5000`

### 2. Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend should be running on `http://localhost:3000`

### 3. Test the Application

1. Open your browser and go to `http://localhost:3000`
2. You should see the calendar interface
3. Click on any date to create an event
4. Fill in the event details and save

## Troubleshooting

### MongoDB Connection Issues

**Local MongoDB:**
- Make sure MongoDB service is running
- Check if port 27017 is accessible
- Try: `mongodb://127.0.0.1:27017/google-calendar-clone`

**MongoDB Atlas:**
- Verify your IP is whitelisted in Atlas
- Check your username and password
- Ensure the cluster is running

### Port Already in Use

If port 5000 or 3000 is already in use:
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

### CORS Errors

Make sure:
- Backend is running before starting frontend
- Backend is on port 5000
- Frontend proxy is configured correctly

## MongoDB Setup Options

### Option A: Local MongoDB

1. Download MongoDB Community Server
2. Install and start MongoDB service
3. Use: `mongodb://localhost:27017/google-calendar-clone`

### Option B: MongoDB Atlas (Free Tier)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a free cluster
4. Get connection string
5. Add your IP to whitelist
6. Use the connection string in `.env`

## Next Steps

- ✅ Create events
- ✅ View events in Month/Week/Day views
- ✅ Click events to see details
- ✅ Navigate between dates

Happy coding! 🎉

