const express = require('express');
const router = express.Router();
const { Review } = require('../database/models');

// GET /reviews
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (e) {
    next(e);
  }
});

// GET /reviews/:id
router.get('/:id', async (req, res, next) => {
  try {
    const r = await Review.findByPk(req.params.id);
    if (!r) return res.status(404).json({ error: 'Review not found' });
    res.json(r);
  } catch (e) {
    next(e);
  }
});

// POST /reviews
router.post('/', async (req, res, next) => {
  try {
    const { userId, gameId, rating, comment } = req.body;
    if (!userId || !gameId || !rating) return res.status(400).json({ error: 'userId, gameId, rating required' });
    const review = await Review.create({ userId, gameId, rating, comment });
    res.status(201).json(review);
  } catch (e) {
    next(e);
  }
});

// PUT /reviews/:id
router.put('/:id', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    await review.update(req.body);
    res.json(review);
  } catch (e) {
    next(e);
  }
});

// DELETE /reviews/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    await review.destroy();
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
