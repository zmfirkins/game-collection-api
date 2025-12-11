Game Collection API

A RESTful API to manage a collection of video games, users, and reviews. Built with Node.js, Express, Sequelize, and SQLite (development) or PostgreSQL (production). Includes JWT authentication, role-based authorization, and full CRUD functionality.

Table of Contents

Features

Setup Instructions

Database Models

Authentication & Authorization

API Endpoints

Testing

Deployment

Postman Collection

Features

User registration and login with JWT authentication

Role-based access: user and admin

CRUD operations for Users, Games, and Reviews

Relational database with Sequelize ORM

Input validation and error handling

Unit tests for core functionality

Setup Instructions

Clone the repository:

git clone https://github.com/zmfirkins/game-collection-api.git
cd game-collection-api


Install dependencies:

npm install


Create a .env file in the root directory:

JWT_SECRET=your_jwt_secret
NODE_ENV=development


Run database setup and seed:

node database/seeders/seed.js


Start the server:

node app.js


The API should now be running at http://localhost:3000 (or your configured port).

Database Models
User
Field	Type	Description
id	INT	Primary key
username	STRING	Required, unique
email	STRING	Required, unique
password	STRING	Required (hashed)
role	STRING	user (default) / admin
Game
Field	Type	Description
id	INT	Primary key
title	STRING	Required
genre	STRING	Optional
releaseYear	INT	Optional
Review
Field	Type	Description
id	INT	Primary key
userId	INT	Foreign key (User)
gameId	INT	Foreign key (Game)
rating	INT	Required (1-5)
comment	STRING	Optional
Authentication & Authorization

Register: POST /auth/register

Login: POST /auth/login

JWT token must be included in the Authorization header for protected routes:

Authorization: Bearer <token>


Roles:

user: Can manage own reviews

admin: Can manage all users, games, and reviews

API Endpoints
Users
Method	URL	Auth	Description
GET	/users	Admin	List all users
GET	/users/:id	Admin	Get user by ID
POST	/users	Admin	Create a new user
PUT	/users/:id	Admin	Update user info
DELETE	/users/:id	Admin	Delete user
Games
Method	URL	Auth	Description
GET	/games	Optional	List all games
GET	/games/:id	Optional	Get game by ID
POST	/games	Admin	Add a new game
PUT	/games/:id	Admin	Update game info
DELETE	/games/:id	Admin	Delete game
Reviews
Method	URL	Auth	Description
GET	/reviews	Any	List all reviews
GET	/reviews/:id	Any	Get review by ID
POST	/reviews	User	Create a review (must be owner)
PUT	/reviews/:id	User	Update review (must be owner)
DELETE	/reviews/:id	User	Delete review (must be owner)
Testing

Run unit tests:

npm test

Tests cover user registration, login, and CRUD operations for all models.

Edge cases for invalid inputs and authorization are included.

Deployment

Your API can be deployed on Render or similar platforms. Configure environment variables for JWT secrets and database URL. Ensure your production database is persistent (PostgreSQL recommended).

Deployed API URL: https://game-collection-api-uqzn.onrender.com

Postman Collection

The Postman collection includes all endpoints with example requests and authentication headers.
Link: https://www.postman.com/zmfirkins-2802803/workspace/zoie-s-workspace/collection/49866931-ed84d51a-33a5-48b0-accf-dcfcfef05e07?action=share&source=copy-link&creator=49866931