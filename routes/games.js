const express = require('express');
const router = express.Router();
const { Game } = require('../database/models');

// GET /games
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (e) {
    next(e);
  }
});

// GET /games/:id
router.get('/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (e) {
    next(e);
  }
});

// POST /games
router.post('/', async (req, res, next) => {
  try {
    const { title, platform, genre, releaseYear, completionStatus } = req.body;
    if (!title || !platform) return res.status(400).json({ error: 'title and platform required' });
    const game = await Game.create({ title, platform, genre, releaseYear, completionStatus });
    res.status(201).json(game);
  } catch (e) {
    next(e);
  }
});

// PUT /games/:id
router.put('/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    await game.update(req.body);
    res.json(game);
  } catch (e) {
    next(e);
  }
});

// DELETE /games/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    await game.destroy();
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
