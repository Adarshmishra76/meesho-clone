# Meesho Pro (MERN Stack)

This is the re-architected Full Stack application.

## Project Structure
- `client/`: Frontend (React, Vite, Tailwind, Redux)
- `server/`: Backend (Node.js, Express, MongoDB)
- `legacy/`: Old static files

## How to Run

### 1. Start Backend
```bash
cd server
npm start
```
Runs on http://localhost:5000

### 2. Start Frontend
```bash
cd client
npm run dev
```
Runs on http://localhost:5173

## Features Implemented So Far
- **Backend Architecture**: MVC structure, MongoDB connection.
- **Authentication**: User Schema, Login/Register Endpoints, JWT Token generation.
- **Frontend Scaffolding**: Vite + React + TypeScript + Tailwind CSS.
- **State Management**: Redux Toolkit + React Query.

## Next Steps
- Implement Frontend Login/Signup Pages.
- Connect Frontend Auth to Backend APIs.
- Create Seller Dashboard.
