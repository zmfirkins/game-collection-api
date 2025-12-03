// database/models/index.js
const sequelize = require('../index'); // import Sequelize connection
const User = require('./user');
const Game = require('./game');
const Review = require('./review');

// Define associations
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

Game.hasMany(Review, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Review.belongsTo(Game, { foreignKey: 'gameId' });

module.exports = {
  sequelize,
  User,
  Game,
  Review,
};
