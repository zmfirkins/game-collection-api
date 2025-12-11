describe("Reviews API", () => {
  let token;
  let gameId;

  beforeAll(async () => {
    // login as existing user
    const loginRes = await request(app).post("/auth/login").send({
      email: "player1@example.com",
      password: "password123"
    });
    token = loginRes.body.token;

    // create a game to review
    const gameRes = await request(app)
      .post("/games")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Mario",
        genre: "Platformer",
        platform: "Switch"
      });

    gameId = gameRes.body.id;
  });

  test("POST /reviews - create a review", async () => {
    const res = await request(app)
      .post("/reviews")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: 1,
        gameId: gameId,
        rating: 5,
        comment: "Amazing game!"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.comment).toBe("Amazing game!");
  });

  test("GET /reviews - get all reviews", async () => {
    const res = await request(app)
      .get("/reviews")
      .set("Au
