# 🚀 START HERE - Quick Navigation Guide

Welcome! This guide helps you quickly find what you need.

## 📍 Quick Links

### 🎯 I Want To...

#### **Run the Project**
→ See [QUICKSTART.md](QUICKSTART.md)

#### **Understand the Code**
→ See [CODE_GUIDE.md](CODE_GUIDE.md)

#### **See Project Structure**
→ See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

#### **Read Full Documentation**
→ See [README.md](README.md)

## 🗺️ Project Map

### 📂 Backend (Server-Side)
```
backend/
├── server.js          ← START: Main server file
├── db/
│   └── connection.js  ← Database connection
├── models/
│   └── Event.js      ← Data structure definition
└── routes/
    └── events.js      ← API endpoints (GET, POST, PUT, DELETE)
```

### 📂 Frontend (Client-Side)
```
frontend/
├── src/
│   ├── App.jsx           ← START: Main React component
│   ├── components/
│   │   ├── MainView.jsx      ← Main calendar container
│   │   ├── Header.jsx        ← Top navigation
│   │   ├── month-view.jsx    ← Month calendar
│   │   ├── week-view.jsx     ← Week calendar
│   │   ├── day-view.jsx      ← Day calendar
│   │   └── event-popover.jsx ← Event creation form
│   └── lib/
│       ├── store.js      ← Global state management
│       ├── api.js         ← API helper functions
│       └── getTime.js     ← Date utilities
```

## 🎓 Learning Path

### Level 1: Beginner
1. ✅ Read [README.md](README.md) - Overview
2. ✅ Run the project using [QUICKSTART.md](QUICKSTART.md)
3. ✅ Explore `frontend/src/App.jsx` - Simplest file
4. ✅ Explore `backend/server.js` - Server setup

### Level 2: Intermediate
1. ✅ Read [CODE_GUIDE.md](CODE_GUIDE.md) - How code works
2. ✅ Understand `backend/routes/events.js` - API endpoints
3. ✅ Understand `frontend/src/lib/store.js` - State management
4. ✅ Explore components in `frontend/src/components/`

### Level 3: Advanced
1. ✅ Study component interactions
2. ✅ Understand date handling with Day.js
3. ✅ Learn Bootstrap classes used
4. ✅ Understand MongoDB queries

## 🔍 File Quick Reference

| File | Purpose | Complexity |
|------|---------|------------|
| `backend/server.js` | Server setup | ⭐ Easy |
| `frontend/src/App.jsx` | Main component | ⭐ Easy |
| `backend/models/Event.js` | Data structure | ⭐⭐ Medium |
| `backend/routes/events.js` | API endpoints | ⭐⭐ Medium |
| `frontend/src/lib/store.js` | State management | ⭐⭐⭐ Advanced |
| `frontend/src/components/month-view.jsx` | Month calendar | ⭐⭐⭐ Advanced |

## 📝 Common Questions

### Q: How do I add a new event?
**A**: Click any date → Fill form → Click Save
- Code: `frontend/src/components/event-popover.jsx`

### Q: Where are events stored?
**A**: MongoDB database
- Schema: `backend/models/Event.js`
- API: `backend/routes/events.js`

### Q: How does the calendar display events?
**A**: Events are fetched and stored in Zustand store
- Fetch: `frontend/src/App.jsx`
- Store: `frontend/src/lib/store.js`
- Display: `frontend/src/components/event-renderer.jsx`

### Q: How do I change the calendar view?
**A**: Use dropdown in header
- Code: `frontend/src/components/header/right-side.jsx`
- State: `frontend/src/lib/store.js`

## 🛠️ Development Workflow

1. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend** (new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser**
   ```
   http://localhost:3000
   ```

4. **Make Changes**
   - Edit files
   - See changes automatically (hot reload)

5. **Test**
   - Create an event
   - View in different calendar views
   - Test all features

## 🎯 Next Actions

👉 **New to the project?** → Start with [QUICKSTART.md](QUICKSTART.md)

👉 **Want to understand code?** → Read [CODE_GUIDE.md](CODE_GUIDE.md)

👉 **Ready to code?** → Open `frontend/src/App.jsx` or `backend/server.js`

---

**Happy Coding! 🚀**

