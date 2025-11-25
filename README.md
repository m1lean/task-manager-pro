# 🚀 Task Manager Pro

Modern task management application built with TypeScript, Node.js, Express and beautiful animated UI


## 📋 Description

Task Manager Pro is a full-featured task management application with a modern interface, built entirely with TypeScript. The project includes a REST API with Node.js/Express using file-based storage and a frontend with advanced animations.

## 🎨 Features

### Design & UI
- ✨ **Modern design** with gradients, glassmorphism and neomorphism
- 🎭 **Smooth animations** (fade, scale, slide, bounce, ripple effects)
- 🌓 **Automatic dark theme** (system preference)
- 📱 **Fully responsive** design for all devices
- 🎪 **Micro-interactions** on hover and click
- 🎨 **Color design system** with CSS variables

### Functionality
- ✅ **CRUD operations** - create, read, update, delete tasks
- 🎯 **Task priorities** - low, medium, high
- 🔍 **Filtering** - all, active, completed, high priority
- 🔄 **Drag & Drop** for task sorting
- 📊 **Real-time statistics**
- 💾 **JSON file storage** on server
- 🔔 **Notifications** for operations
- ⚡ **Quick actions** (complete, delete)

### Technical Features
- 📦 **TypeScript** on frontend and backend
- 🏗️ **OOP architecture** with classes
- 🔌 **REST API** with Express
- 🎯 **Type safety** for all data
- 🛡️ **Error handling** and validation
- 🚀 **Vite** for fast development

## 🛠 Technologies

### Backend
```
- Node.js 20+
- Express 4.18
- TypeScript 5.3
- UUID for ID generation
- CORS for cross-origin requests
- File-based storage (JSON)
```

### Frontend
```
- TypeScript 5.3
- Vanilla JavaScript (no frameworks)
- CSS3 with variables and animations
- Fetch API for HTTP requests
- Drag & Drop API
- Vite 5.0 (dev server and bundler)
```

## 📦 Installation

### Prerequisites

Make sure you have installed:
- Node.js version 18 or higher
- npm version 9 or higher

### 1. Project Setup

```bash
# Create project structure
mkdir task-manager-pro
cd task-manager-pro

# Create backend and frontend folders
mkdir -p backend/src/{controllers,models,routes,storage,middlewares,types}
mkdir -p backend/data
mkdir -p frontend/src/{scripts,styles}
```

### 2. Backend Setup

```bash
cd backend

# Initialize package.json
npm init -y

# Install dependencies
npm install express cors uuid

# Install dev dependencies
npm install --save-dev typescript @types/node @types/express @types/cors @types/uuid tsx
```

Create files in `backend/` folder:
- `src/types/index.ts`
- `src/models/Task.ts`
- `src/storage/fileStorage.ts`
- `src/controllers/taskController.ts`
- `src/routes/taskRoutes.ts`
- `src/middlewares/errorHandler.ts`
- `src/server.ts`
- `tsconfig.json`
- `package.json` (update scripts)

**Update `backend/package.json` scripts:**
```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

### 3. Frontend Setup

```bash
cd ../frontend

# Initialize
npm init -y

# Install dependencies
npm install --save-dev typescript vite
```

Create files in `frontend/src/` folder:
- `scripts/api.ts`
- `scripts/animations.ts`
- `scripts/ui.ts`
- `styles/main.css`
- `index.html`
- `tsconfig.json`
- `package.json` (update scripts)

**Update `frontend/package.json` scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## 🚀 Running the Project

### Option 1: Development (2 terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will open automatically on `http://localhost:5173`

### Option 2: Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Static files will be in dist/ folder
# Deploy them on any static hosting
```

## 🗂 Project Structure

```
task-manager-pro/
│
├── backend/                          # Backend application
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.ts    # Controllers for request handling
│   │   ├── models/
│   │   │   └── Task.ts              # Task model
│   │   ├── routes/
│   │   │   └── taskRoutes.ts        # API routes
│   │   ├── storage/
│   │   │   └── fileStorage.ts       # File storage operations
│   │   ├── middlewares/
│   │   │   └── errorHandler.ts      # Error handling
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript types and interfaces
│   │   └── server.ts                # Main server file
│   │
│   ├── data/
│   │   └── tasks.json               # JSON database
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                         # Frontend application
│   └── src/
│       ├── scripts/
│       │   ├── api.ts               # API client for HTTP requests
│       │   ├── animations.ts        # Animation manager and D&D
│       │   └── ui.ts                # UI logic and management
│       │
│       ├── styles/
│       │   └── main.css             # All application styles
│       │
│       ├── index.html               # Main page
│       ├── package.json
│       └── tsconfig.json
│
└── README.md                         # This file
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/tasks` | Get all tasks | - |
| GET | `/tasks/:id` | Get task by ID | - |
| POST | `/tasks` | Create new task | `{ title, description?, priority }` |
| PUT | `/tasks/:id` | Update task | `{ title?, description?, priority?, completed? }` |
| DELETE | `/tasks/:id` | Delete task | - |

### Request Examples

**Create task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn TypeScript",
    "description": "Complete TypeScript course",
    "priority": "high"
  }'
```

**Get all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Update task:**
```bash
curl -X PUT http://localhost:3000/api/tasks/[ID] \
  -H "Content-Type: application/json" \
  -d '{ "completed": true }'
```

**Delete task:**
```bash
curl -X DELETE http://localhost:3000/api/tasks/[ID]
```

## 🎨 Design System

### Color Palette

```css
/* Primary colors */
--color-primary: #00d4aa        /* Teal */
--color-secondary: #667eea      /* Purple */
--color-danger: #f56565         /* Red */
--color-success: #48bb78        /* Green */

/* Backgrounds */
--color-bg-primary: #0f172a     /* Dark blue */
--color-bg-secondary: #1e293b   /* Gray-blue */
--color-bg-tertiary: #334155    /* Light gray */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-success: linear-gradient(135deg, #00d4aa 0%, #00b4d8 100%)
```

### Animations

- **Fade In/Out** - smooth appear/disappear
- **Scale In** - zoom with spring effect
- **Slide Down** - slide down effect
- **Shake** - shake on error
- **Pulse** - pulse on click
- **Ripple** - ripple effect on click
- **Float** - floating animation

### Spacing System

```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
```

### Border Radius

```css
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px
```

## ⚙️ Configuration

### Backend Port

Change port in `backend/src/server.ts`:
```typescript
const PORT = process.env.PORT || 3000;
```

### Frontend API URL

Change base URL in `frontend/src/scripts/api.ts`:
```typescript
constructor(baseURL: string = 'http://localhost:3000/api') {
  this.baseURL = baseURL;
}
```

### Data File Path

Change in `backend/src/storage/fileStorage.ts`:
```typescript
const DATA_FILE = path.join(__dirname, '../../data/tasks.json');
```

## 🧪 Testing

### API Testing

```bash
# Check server health
curl http://localhost:3000/

# Get all tasks
curl http://localhost:3000/api/tasks

# Create test task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","priority":"medium"}'
```

### Frontend Testing

1. Open `http://localhost:5173`
2. Create several tasks
3. Test filtering
4. Try Drag & Drop
5. Complete and delete tasks
6. Check responsiveness (DevTools → Mobile view)

## 🐛 Troubleshooting

### Backend Won't Start

**Problem:** `Error: Cannot find module 'express'`

**Solution:**
```bash
cd backend
npm install
```

### Frontend Can't Connect to API

**Problem:** CORS error

**Solution:** Make sure backend is running and CORS is enabled in `server.ts`:
```typescript
import cors from 'cors';
app.use(cors());
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use`

**Solution:**
```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 [PID]

# Or change port in server.ts
```

### TypeScript Errors

**Problem:** TypeScript can't find types

**Solution:**
```bash
# Backend
cd backend
npm install --save-dev @types/node @types/express @types/cors

# Frontend  
cd frontend
npm install --save-dev typescript
```

## 📚 Extending Functionality

### Adding New Task Fields

1. Update interface in `backend/src/types/index.ts`:
```typescript
export interface Task {
  // ... existing fields
  deadline?: string;
  tags?: string[];
}
```

2. Update model in `backend/src/models/Task.ts`

3. Update interface in `frontend/src/scripts/api.ts`

4. Add fields to form in `frontend/src/index.html`

5. Update UI in `frontend/src/scripts/ui.ts`

### Adding Database

Replace file storage with:
- **SQLite** - lightweight SQL database
- **MongoDB** - NoSQL database
- **PostgreSQL** - full SQL database

Example with MongoDB:
```bash
npm install mongoose
```

Create `backend/src/storage/mongoStorage.ts`:
```typescript
import mongoose from 'mongoose';
// ... MongoStorage implementation
```

## 🚀 Deployment

### Backend (Heroku)

```bash
# Install Heroku CLI
heroku login
heroku create task-manager-api

# Deploy
git push heroku main

# Check
heroku logs --tail
```

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Frontend (Netlify)

```bash
# Build
cd frontend
npm run build

# Upload contents of dist/ folder to Netlify
```

## 📄 License

MIT License - free to use for any purpose

## 👨‍💻 Author

Created as an educational project to learn TypeScript, Node.js and modern web technologies

## 🤝 Contributing

Pull requests are welcome for improvements:
- New animations
- Additional features
- Bug fixes
- Documentation improvements

## 📝 Changelog

### Version 1.0.0 (2025-11-25)
- ✅ Initial release
- ✅ CRUD operations for tasks
- ✅ Drag & Drop sorting
- ✅ Filtering and statistics
- ✅ Modern UI with animations
- ✅ TypeScript on frontend and backend
- ✅ REST API with Express
- ✅ File-based storage

***

**Enjoy! 🎉**