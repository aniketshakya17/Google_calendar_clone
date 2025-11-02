# Google Calendar Clone - Backend

Express.js RESTful API server for Google Calendar Clone using MongoDB Atlas.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   
   The `.env` file should contain:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/calendarApp?retryWrites=true&w=majority&tls=true
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events (sorted by date) |
| GET | `/api/events/:id` | Get event by ID |
| POST | `/api/events` | Create new event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |

### Health Check

- `GET /api/health` - Server status

## 🗄️ Database Configuration

### MongoDB Atlas Connection

The backend is configured to use MongoDB Atlas (cloud database).

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/databaseName?retryWrites=true&w=majority&tls=true
```

**Environment Variable:**
- `MONGO_URI` - Primary connection string (MongoDB Atlas)
- `MONGODB_URI` - Alternative name (also supported)
- `DATABASE_URL` - Alternative name (also supported)

The connection file (`db/connection.js`) checks these variables in order and uses the first one found.

## 📝 Request/Response Examples

### Create Event

**Request:**
```json
POST /api/events
Content-Type: application/json

{
  "title": "Team Meeting",
  "description": "Discuss project progress",
  "date": "2024-01-15",
  "time": "14:30"
}
```

**Response:**
```json
{
  "success": true,
  "event": {
    "id": "65a1b2c3d4e5f6789abcdef0",
    "title": "Team Meeting",
    "description": "Discuss project progress",
    "date": "2024-01-15T14:30:00.000Z"
  }
}
```

### Get All Events

**Request:**
```
GET /api/events
```

**Response:**
```json
[
  {
    "id": "65a1b2c3d4e5f6789abcdef0",
    "title": "Team Meeting",
    "description": "Discuss project progress",
    "date": "2024-01-15T14:30:00.000Z"
  }
]
```

## 🗃️ Database Schema

### Event Model

```javascript
{
  title: String (required),
  description: String (required),
  date: Date (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔧 Project Structure

```
backend/
├── server.js          # Main server entry point
├── db/
│   └── connection.js  # MongoDB connection setup
├── models/
│   └── Event.js      # Event database schema
├── routes/
│   └── events.js      # Event API routes
└── .env              # Environment variables (not in git)
```

## 🌐 MongoDB Atlas Setup

### If you need to create a new connection:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create/select your cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<database>` in the string
6. Update `MONGO_URI` in `.env` file

### Important Notes:

- Make sure your IP is whitelisted in MongoDB Atlas
- Use strong password for database user
- Keep `.env` file secure (don't commit to git)

## 🐛 Troubleshooting

### Connection Errors

- **"Authentication failed"**: Check username/password in connection string
- **"Connection timeout"**: Verify IP is whitelisted in Atlas
- **"Invalid connection string"**: Check format of MONGO_URI

### Server Issues

- **Port already in use**: Change `PORT` in `.env`
- **Module not found**: Run `npm install`
- **Database errors**: Check MongoDB Atlas cluster status

## 📦 Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - CORS middleware
- `dotenv` - Environment variable management
- `dayjs` - Date manipulation

---

**Backend is ready to use with MongoDB Atlas!** 🚀
