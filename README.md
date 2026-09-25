# 🛡️ Web Application Firewall (WAF) + JWT Authentication

> A security-focused full-stack application that detects and blocks malicious HTTP requests while providing JWT-based authentication and protected API access.

This project implements a custom **Web Application Firewall (WAF)** that inspects incoming HTTP requests before they reach application routes.

It detects threats such as **SQL injection, XSS, path traversal, and suspicious requests**, while also providing dynamic IP blocking, rate limiting, security logging, and JWT authentication.

---

## 🚀 Live Demo

**Frontend:**  
https://waf-jwt-frontend.vercel.app

**Backend API:**  
https://waf-jwt.onrender.com

---

## 📋 Overview

The WAF operates as middleware within the Express.js backend and analyzes incoming HTTP requests before they reach application routes.

Suspicious or malicious requests can be blocked automatically, with the source IP temporarily added to a dynamic block list.

The application also includes **JWT-based authentication**, protected routes, and refresh-token handling.

---

## 🏗️ Architecture

```text
User
  │
  ▼
React Frontend
(Vercel)
  │
  ▼
Express Server
(Render)
  │
  ▼
Custom WAF Middleware
  │
  ├── Request Inspection
  ├── Threat Detection
  ├── Rate Limiting
  └── IP Blocking
  │
  ▼
JWT Authentication
  │
  ▼
MongoDB Atlas
```

---

## ✨ Features

### 🛡️ WAF Security

- SQL Injection detection
- XSS detection
- Path traversal protection
- Suspicious user-agent detection
- Request payload inspection
- Dynamic IP blocking
- Rate limiting
- Security logging

### 🔐 Authentication

- JWT access tokens
- Refresh token system
- Protected API routes
- Automatic token refresh using Axios interceptors

### ⚙️ Backend

- Express REST API
- Middleware-based WAF filtering
- MongoDB user storage
- Helmet security headers
- CORS protection

### 💻 Frontend

- React + Vite
- Login and registration pages
- Axios interceptors for authentication
- Protected dashboard route

---

## 🛠️ Tech Stack

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

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
```

### User

```text
GET /api/users/me
```

### Health Check

```text
GET /health
```

---

## 🧪 WAF Protection Examples

The WAF inspects incoming requests for suspicious patterns associated with common web attacks.

### SQL Injection

Example malicious input:

```text
' OR 1=1 -- UNION SELECT DROP TABLE
```

### XSS

Example:

```html
<script> onerror= javascript:
```

### Path Traversal

Example:

```text
../
%2E%2E
```

When a malicious request is detected, the request can be blocked:

```json
{
  "ok": false,
  "reason": "malicious_payload"
}
```

---

## 🔄 Request Security Flow

```text
Incoming Request
      │
      ▼
WAF Middleware
      │
      ▼
Request Inspection
      │
      ├── Malicious ──► Block / Log
      │
      └── Safe
           │
           ▼
    JWT Authentication
           │
           ▼
      Protected Route
           │
           ▼
        Database
```

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Developer-Sohail786/WAF-JWT.git
cd WAF-JWT
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd Frontend
npm install
```

### 4. Configure backend environment variables

Create:

```text
Backend/.env
```

Add:

```env
MONGO_URL=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret

ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d

WAF_ENABLED=true
```

### 5. Run the backend

```bash
npm start
```

### 6. Run the frontend

Inside the `Frontend` directory:

```bash
npm run dev
```

---

## 📁 Project Structure

```text
WAF-JWT/
│
├── Backend/
│   ├── ...
│   └── ...
│
├── Frontend/
│   ├── ...
│   └── ...
│
└── README.md
```

---

## 🔒 Security Components

The project combines multiple security mechanisms:

- Custom WAF middleware
- SQL injection detection
- XSS detection
- Path traversal protection
- Dynamic IP blocking
- Rate limiting
- Security logging
- JWT authentication
- Refresh tokens
- Protected routes
- Helmet security headers
- CORS protection

---

## 👨‍💻 Author

**Sohail Khan**

Full-Stack Developer | Backend | Web Security

---

## 📜 License

This project is licensed under the MIT License.
