const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const gamesRouter = require('./routes/games');
const usersRouter = require('./routes/users');
const reviewsRouter = require('./routes/reviews');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.json({ message: 'Game Collection Tracker API (MVP)' }));

app.use('/games', gamesRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);

// error handler (should be last)
app.use(errorHandler);

module.exports = app;
