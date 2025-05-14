# PERN Stack Monorepo

This is a monorepo for a PERN (PostgreSQL, Express, React, Node.js) stack application consisting of:

- A React frontend with CRUD operations for tutorials
- A Node.js/Express backend API with PostgreSQL database

## Directory Structure

```
pern/
├── packages/
│   ├── frontend/      # React frontend application
│   └── backend/       # Express API server
└── package.json       # Root package.json with workspace configuration
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm 
- PostgreSQL database

### Installation

1. Install root dependencies:
   ```
   npm install
   ```

2. Install frontend and backend dependencies:
   ```
   npm run install:frontend
   npm run install:backend
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env.local` in the frontend package
   - Copy `.env.example` to `.env` in the backend package
   - Update the values as needed for your environment

4. Initialize the database:
   ```
   npm run initialize:db
   ```

### Running the Application

Start both frontend and backend with a single command:
```
npm start
```

Or run them separately:
```
npm run start:frontend
npm run start:backend
```

### Accessing the Application

- Frontend: http://localhost:80
- Backend API: http://localhost:8080/api

## Development

- Frontend code is in `packages/frontend`
- Backend code is in `packages/backend`

### Environment Variables

#### Frontend (.env.local)
```
PORT=80
NODE_ENV=development
VITE_APP_API_URL='http://localhost:8080/api'
```

#### Backend (.env)
```
NODE_ENV=development
PORT=8080
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=tutorial_db
DB_PORT=5432
```

## Git Setup

See the `GIT_SETUP.md` file for instructions on setting up git for this monorepo.

## References

For detailed documentation, refer to the README.md files in each package directory.