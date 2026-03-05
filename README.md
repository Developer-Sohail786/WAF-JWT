# Web Application Firewall (WAF) + JWT Authentication

Detect and block malicious requests (SQL injection, XSS, abuse) using a custom Web Application Firewall integrated with JWT authentication.

---

## Live Demo

Frontend  
https://waf-jwt-frontend.vercel.app

Backend API  
https://waf-jwt.onrender.com

---

## Overview

This project implements a custom **Web Application Firewall (WAF)** that inspects incoming HTTP requests before they reach application routes.

Malicious or suspicious requests are blocked automatically and the source IP can be temporarily added to a dynamic block list.

The system also includes **JWT authentication**, protected routes, and token refresh handling.

---

## Architecture
User
↓
React Frontend (Vercel)
↓
Express Server (Render)
↓
Custom WAF Middleware
↓
JWT Authentication
↓
MongoDB Atlas


---

## Features

### Security (WAF)

- SQL Injection detection
- XSS detection
- Path traversal protection
- Suspicious user-agent detection
- Request payload inspection
- Dynamic IP blocking
- Rate limiting
- Security logging

### Authentication

- JWT access tokens
- Refresh token system
- Protected API routes
- Automatic token refresh using Axios interceptors

### Backend

- Express REST API
- Middleware-based WAF filtering
- MongoDB user storage
- Helmet security headers
- CORS protection

### Frontend

- React + Vite
- Login and Register pages
- Axios interceptors for authentication
- Protected dashboard route

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## API Endpoints

### Authentication

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh


### User

GET /api/users/me


### Health Check

GET /health

---

## WAF Protection Examples

### SQL Injection

' OR 1=1 --
UNION SELECT
DROP TABLE


### XSS

<script> onerror= javascript:
  
### Path Traversal
  
../ %2E%2E
When detected, the request is blocked:
{ "ok": false, "reason": "malicious_payload" }
--- ## Local Setup Clone the repository
git clone https://github.com/Developer-Sohail786/WAF-JWT.git
Install backend dependencies
cd Backend npm install
Install frontend dependencies
cd Frontend npm install
Create backend `.env`
MONGO_URL=your_mongodb_uri 
ACCESS_TOKEN_SECRET=your_secret 
REFRESH_TOKEN_SECRET=your_secret 
ACCESS_TOKEN_EXPIRY=1d 
REFRESH_TOKEN_EXPIRY=7d 
WAF_ENABLED=true
  
Run backend
npm start
Run frontend
npm run dev
--- ## Author Sohail Khan
