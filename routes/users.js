const express = require('express');
const router = express.Router();
const { User } = require('../database/models');

// GET /users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

// GET /users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// POST /users
router.post('/', async (req, res, next) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) return res.status(400).json({ error: 'username and email required' });
    const user = await User.create({ username, email });
    res.status(201).json(user);
  } catch (e) {
    // handle unique constraint error nicely
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'username or email already exists' });
    }
    next(e);
  }
});

// PUT /users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
