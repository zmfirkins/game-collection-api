const request = require('supertest');
const app = require('../app');
const { sequelize, Game } = require('../database/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Game.create({ title: 'Test Game', platform: 'PC' });
});

afterAll(async () => {
  await sequelize.close();
});

test('GET /games returns 200 and a list', async () => {
  const res = await request(app).get('/games');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

test('POST /games missing title returns 400', async () => {
  const res = await request(app).post('/games').send({ platform: 'PC' });
  expect(res.statusCode).toBe(400);
});
