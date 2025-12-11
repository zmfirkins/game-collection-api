const express = require("express");
const { Review } = require("../database/models");
const { auth, admin } = require("../middleware");

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
  const reviews = await Review.findAll();
  res.json(reviews);
});

// Create review (LOGGED IN)
router.post("/", auth, async (req, res) => {
  const review = await Review.create({
    ...req.body,
    userId: req.user.id
  });

  res.status(201).json(review);
});

// Update review (OWNER or ADMIN)
router.put("/:id", auth, async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });

  if (review.userId !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Not allowed" });
  }

  await review.update(req.body);
  res.json(review);
});

// Delete review (OWNER or ADMIN)
router.delete("/:id", auth, async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });

  if (review.userId !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Not allowed" });
  }

  await review.destroy();
  res.json({ message: "Review deleted" });
});

module.exports = router;
