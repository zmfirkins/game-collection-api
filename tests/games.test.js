describe("Games API", () => {
  let token;

  beforeAll(async () => {
    // register and login a user to get token
    await request(app).post("/auth/register").send({
      username: "player1",
      email: "player1@example.com",
      password: "password123"
    });

    const res = await request(app).post("/auth/login").send({
      email: "player1@example.com",
      password: "password123"
    });

    token = res.body.token;
  });

  test("POST /games - create a new game", async () => {
    const res = await request(app)
      .post("/games")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Zelda",
        genre: "Adventure",
        platform: "Switch"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Zelda");
  });

  test("GET /games - get all games", async () => {
    const res = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
