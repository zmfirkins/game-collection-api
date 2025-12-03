 Game Collection API

A RESTful API for managing users, games, and reviews in a game collection application.  
This project demonstrates core backend development skills including CRUD operations, Sequelize models with relationships, basic error handling, and sample data seeding.

---

## Table of Contents

- [Setup](#setup)  
- [Database](#database)  
- [Endpoints](#endpoints)  
  - [Users](#users)  
  - [Games](#games)  
  - [Reviews](#reviews)  
- [Postman API Documentation](#postman-api-documentation)  

---

## Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   cd game-collection-api
Install dependencies:

bash
Copy code
npm install
Create a .env file if required for configuration.

Seed the database with sample data:

bash
Copy code
npm run seed
Start the server:

bash
Copy code
node app.js
Access the API at:

arduino
Copy code
http://localhost:3000
Database
This API uses SQLite with Sequelize ORM.

Models and Relationships:

User

id (PK)

username (string, required)

email (string, required, unique)

Game

id (PK)

title (string, required)

platform (string, required)

genre (string)

releaseDate (date)

Review

id (PK)

rating (integer, required)

comment (string)

userId (FK → User.id)

gameId (FK → Game.id)

Relationships:

One User can write many Reviews.

One Game can have many Reviews.

Reviews belong to a single User and a single Game.

Endpoints
Users
GET /users
Retrieve all users.
Response:

json
Copy code
[
  { "id": 1, "username": "charlie", "email": "charlie@example.com" }
]
GET /users/:id
Retrieve a single user by ID.

POST /users
Create a new user.
Body Parameters:

json
Copy code
{
  "username": "zoie",
  "email": "zoie@example.com"
}
Response:

json
Copy code
{ "id": 2, "username": "zoie", "email": "zoie@example.com" }
PUT /users/:id
Update user information.
Body Parameters: same as POST
Response: updated user object

DELETE /users/:id
Delete a user.
Response: confirmation message

Games
GET /games
Retrieve all games.

GET /games/:id
Retrieve a single game by ID.

POST /games
Create a new game.
Body Parameters:

json
Copy code
{
  "title": "Zelda: Breath of the Wild",
  "platform": "Switch",
  "genre": "Adventure",
  "releaseDate": "2017-03-03"
}
Response: created game object

PUT /games/:id
Update game information.
Body Parameters: same as POST

DELETE /games/:id
Delete a game.
Response: confirmation message

Reviews
GET /reviews
Retrieve all reviews.

GET /reviews/:id
Retrieve a single review by ID.

POST /reviews
Create a new review.
Body Parameters:

json
Copy code
{
  "rating": 5,
  "comment": "Amazing game!",
  "userId": 1,
  "gameId": 1
}
Response: created review object

PUT /reviews/:id
Update a review.
Body Parameters: same as POST

DELETE /reviews/:id
Delete a review.
Response: confirmation message

Postman API Documentation
You can view and test all endpoints with example requests/responses here:
https://www.postman.com/zmfirkins-2802803/zoie-s-workspace/collection/90311r9/game-collection-api?action=share&creator=49866931
