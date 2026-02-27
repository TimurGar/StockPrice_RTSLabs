# Stock Price Tracker

A full-stack web application that allows users to sign up, log in, and search for real-time stock prices using the Finnhub API.

## Live Demo

**Deployed Application:** [https://stock-price-rts-labs.vercel.app/](https://stock-price-rts-labs.vercel.app/)

## Features

- **User Authentication**: Secure signup/login with JWT tokens and bcrypt password hashing
- **Stock Price Search**: Real-time stock data including current price, opening price, high, and low
- **Protected Routes**: Stock search functionality only available to authenticated users
- **Comprehensive Testing**: Full test suite covering signup, login, and stock search

## Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Finnhub API** for stock data

### Frontend

- **React 19** with Vite
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Radix UI** components

### Testing

- **Jest** for test framework
- **Supertest** for API testing

## Prerequisites

- Node.js (v20.14.0 or higher recommended)
- MongoDB Atlas account (or local MongoDB)
- Finnhub API key (free at https://finnhub.io)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd StockPrice_RTSLabs
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd client && npm install --legacy-peer-deps
   cd ..
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   MONGO=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3001
   NODE_ENV=development
   FINNHUB_API_KEY=your_finnhub_api_key
   ```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:

```bash
npm run dev:full
```

Or run them separately:

```bash
# Backend (port 3001)
npm run dev

# Frontend (port 5173)
npm run client
```

Access the application at http://localhost:5173

### Production Mode

```bash
npm start
```

## Running Tests

Run the test suite:

```bash
npm test
```

The tests cover:

- User signup (with duplicate prevention)
- User login (with validation)
- Stock search for valid symbols (AAPL, TSLA)
- Invalid stock symbol handling
- Authentication protection
- User logout

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Login user
- `GET /api/auth/signout` - Logout user

### Stock Data (Protected)

- `GET /api/stock/quote?symbol=AAPL` - Get stock quote for symbol

### User

- `DELETE /api/user/delete/:id` - Delete user account
- `POST /api/user/update/:id` - Update user information

## Project Structure

```
StockPrice_RTSLabs/
├── api/
│   ├── controllers/       # Request handlers
│   │   ├── auth.controller.js
│   │   ├── stock.controller.js
│   │   └── user.controller.js
│   ├── models/           # Database schemas
│   │   └── user.model.js
│   ├── routes/           # API routes
│   │   ├── auth.route.js
│   │   ├── stock.route.js
│   │   └── user.route.js
│   ├── utils/            # Utilities
│   │   ├── error.js
│   │   └── verifyUser.js
│   └── index.js          # Express app setup
├── client/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── SignUp.jsx
│   │   ├── redux/        # State management
│   │   └── App.jsx
│   └── package.json
├── __tests__/
│   └── api.test.js       # Integration tests
├── .env                  # Environment variables
├── package.json
└── README.md
```
