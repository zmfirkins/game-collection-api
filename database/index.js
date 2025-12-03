const sequelize = require('../index');
const User = require('./user');
const Game = require('./game');
const Review = require('./review');

// Associations
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

Game.hasMany(Review, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Review.belongsTo(Game, { foreignKey: 'gameId' });

module.exports = { sequelize, User, Game, Review };
