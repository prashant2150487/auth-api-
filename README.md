# Authentication API with JWT

A Node.js authentication API built with Express, Sequelize, MySQL, and JWT.

## Features

- User registration and sign-in
- JWT token-based authentication
- Password hashing with bcrypt
- MySQL database integration
- Protected routes with middleware

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
HOST=0.0.0.0
```

3. Make sure MySQL is running and create the database

4. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication Routes

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Sign in with email and password
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Health Check

- `GET /health` - Check if server is running

## API Usage Examples

### Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Sign In
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile (Protected Route)
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Response Format

All responses follow this format:
```json
{
  "success": true/false,
  "message": "Description",
  "data": {
    // Response data
  }
}
```

## Database Schema

The User model includes:
- `id` (Primary Key, Auto Increment)
- `name` (String, Required)
- `email` (String, Required, Unique)
- `password` (String, Required, Hashed)
