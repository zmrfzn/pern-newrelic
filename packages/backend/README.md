# Backend Package - Express.js REST API

This is the backend package of the PERN Stack monorepo, an Express.js application that provides a RESTful API for managing tutorials.

## Features

- RESTful API endpoints for tutorial management
- PostgreSQL database with Sequelize ORM
- CRUD operations for tutorials
- Category management
- Published/unpublished filtering

## Technology Stack

- Node.js with Express.js
- PostgreSQL database
- Sequelize ORM
- Winston for logging
- CORS enabled

## Development

### Setup

```
npm install
```

### Database Setup

Initialize the database with:

```
npm run initialize
```

This will:
1. Create the database
2. Run migrations
3. Seed initial data

### Running the Server

```
npm start
```

The API will be available at http://localhost:8080/api by default.

## API Endpoints

- `GET /api/tutorials` - Get all tutorials
- `GET /api/tutorials/:id` - Get tutorial by ID
- `POST /api/tutorials` - Create a new tutorial
- `PUT /api/tutorials/:id` - Update a tutorial
- `DELETE /api/tutorials/:id` - Delete a tutorial
- `DELETE /api/tutorials` - Delete all tutorials
- `GET /api/tutorials/published` - Get all published tutorials
- `GET /api/tutorials/categories` - Get all categories 