const request = require('supertest');
const app = require('../app');

describe("Games API", () => {
  let token;

  beforeAll(async () => {
    // Register a test user
    const res = await request(app)
      .post("/auth/register")
      .send({
        username: "player1",
        email: "player1@example.com",
        password: "password123"
      });
    
    // Login to get token
    const loginRes = await request(app)
      .post("/auth/login")
      .send({
        email: "player1@example.com",
        password: "password123"
      });

    token = loginRes.body.token; // if your auth returns a token
  });

  it("POST /games - create a new game", async () => {
    const res = await request(app)
      .post("/games")
      .set("Authorization", `Bearer ${token}`) // optional if using auth
      .send({
        title: "Test Game",
        genre: "Adventure",
        platform: "PC",             // ✅ required
        completionStatus: "not started"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Game");
  });

  it("GET /games - get all games", async () => {
    const res = await request(app).get("/games");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
