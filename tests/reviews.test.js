// tests/reviews.test.js
const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../database/models');

beforeAll(async () => {
  // Make sure the database tables exist
  await sequelize.sync({ force: true }); // reset tables for testing
});

afterAll(async () => {
  await sequelize.close();
});

describe('Reviews API', () => {
  let token; // if using auth
  let userId;
  let gameId;

  beforeAll(async () => {
    // Register a user
    const userRes = await request(app)
      .post('/auth/register')
      .send({
        username: 'reviewer1',
        email: 'reviewer1@example.com',
        password: 'password123',
      });

    userId = userRes.body.id;

    // If your auth returns a token after login/register
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'reviewer1@example.com',
        password: 'password123',
      });

    token = loginRes.body.token;

    // Create a game
    const gameRes = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${token}`) // optional if auth required
      .send({
        title: 'Test Game',
        genre: 'RPG',
        platform: 'PC',
        completionStatus: 'not started',
      });

    gameId = gameRes.body.id;
  });

  it('POST /reviews - create a new review', async () => {
    const res = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`) // optional
      .send({
        userId,
        gameId,
        rating: 5,
        comment: 'Amazing game!',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.comment).toBe('Amazing game!');
  });

  it('GET /reviews - get all reviews', async () => {
    const res = await request(app)
      .get('/reviews')
      .set('Authorization', `Bearer ${token}`); // optional

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
