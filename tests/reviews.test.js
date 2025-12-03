const request = require('supertest');
const app = require('../app');
const { sequelize, User, Game } = require('../database/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ username: 'tester', email: 'tester@example.com' });
  await Game.create({ title: 'G', platform: 'PC' });
});

afterAll(async () => {
  await sequelize.close();
});

test('POST /reviews creates a review', async () => {
  const users = await User.findAll();
  const games = await Game.findAll();

  const res = await request(app)
    .post('/reviews')
    .send({
      userId: users[0].id,
      gameId: games[0].id,
      rating: 8,
      comment: 'Nice'
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.rating).toBe(8);
});
