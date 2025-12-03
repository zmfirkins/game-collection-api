// app.js
const express = require('express');
const { sequelize, User, Game, Review } = require('./database/models');

const app = express();
const PORT = process.env.PORT || 3000;

// ------------------------
// Middleware
// ------------------------
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ------------------------
// Users Routes
// ------------------------

// GET all users
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET user by ID
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST new user
app.post('/users', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// PUT update user
app.put('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// DELETE user
app.delete('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
});

// ------------------------
// Games Routes
// ------------------------

// GET all games
app.get('/games', async (req, res, next) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (err) {
    next(err);
  }
});

// GET game by ID
app.get('/games/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    next(err);
  }
});

// POST new game
app.post('/games', async (req, res, next) => {
  try {
    const newGame = await Game.create(req.body);
    res.status(201).json(newGame);
  } catch (err) {
    next(err);
  }
});

// PUT update game
app.put('/games/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    await game.update(req.body);
    res.json(game);
  } catch (err) {
    next(err);
  }
});

// DELETE game
app.delete('/games/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    await game.destroy();
    res.json({ message: 'Game deleted' });
  } catch (err) {
    next(err);
  }
});

// ------------------------
// Reviews Routes with validation
// ------------------------

// GET all reviews
app.get('/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: [User, Game] });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// GET review by ID
app.get('/reviews/:id', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, { include: [User, Game] });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    next(err);
  }
});

// POST new review with foreign key check
app.post('/reviews', async (req, res, next) => {
  try {
    const { userId, gameId, rating, comment } = req.body;

    const user = await User.findByPk(userId);
    const game = await Game.findByPk(gameId);

    if (!user || !game) {
      return res.status(400).json({ error: 'Invalid userId or gameId' });
    }

    const newReview = await Review.create({ userId, gameId, rating, comment });
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

// PUT update review
app.put('/reviews/:id', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    // Optional: Validate userId and gameId if being updated
    if (req.body.userId) {
      const user = await User.findByPk(req.body.userId);
      if (!user) return res.status(400).json({ error: 'Invalid userId' });
    }
    if (req.body.gameId) {
      const game = await Game.findByPk(req.body.gameId);
      if (!game) return res.status(400).json({ error: 'Invalid gameId' });
    }

    await review.update(req.body);
    res.json(review);
  } catch (err) {
    next(err);
  }
});

// DELETE review
app.delete('/reviews/:id', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    await review.destroy();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
});

// ------------------------
// Stats Endpoint
// ------------------------
app.get('/stats', async (req, res, next) => {
  try {
    const totalGames = await Game.count();
    const completedGames = await Game.count({ where: { completionStatus: 'completed' } });
    const totalUsers = await User.count();
    res.json({ totalUsers, totalGames, completedGames });
  } catch (err) {
    next(err);
  }
});

// ------------------------
// Error Handler
// ------------------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// ------------------------
// Start Server
// ------------------------
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
});
