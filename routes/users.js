const express = require("express");
const { User } = require("../database/models");
const { auth, admin } = require("../middleware");

const router = express.Router();

// GET all users (ADMIN ONLY)
router.get("/", admin, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get logged-in user's profile
router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

// Delete a user (ADMIN ONLY)
router.delete("/:id", admin, async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "User deleted" });
});

module.exports = router;
