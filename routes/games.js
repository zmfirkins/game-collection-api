const express = require("express");
const { Game } = require("../database/models");
const { auth, admin } = require("../middleware");

const router = express.Router();

// Get all games
router.get("/", async (req, res) => {
  const games = await Game.findAll();
  res.json(games);
});

// Create game (ADMIN)
router.post("/", admin, async (req, res) => {
  const game = await Game.create(req.body);
  res.status(201).json(game);
});

// Update game (ADMIN)
router.put("/:id", admin, async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (!game) return res.status(404).json({ error: "Game not found" });

  await game.update(req.body);
  res.json(game);
});

// Delete game (ADMIN)
router.delete("/:id", admin, async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (!game) return res.status(404).json({ error: "Game not found" });

  await game.destroy();
  res.json({ message: "Game deleted" });
});

module.exports = router;
