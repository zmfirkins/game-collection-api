module.exports = (err, req, res, next) => {
  console.error(err);
  // If error has status, use it; otherwise 500
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
};
