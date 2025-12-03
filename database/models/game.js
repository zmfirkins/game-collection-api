const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Game = sequelize.define('Game', {
  title: { type: DataTypes.STRING, allowNull: false },
  platform: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING },
  releaseYear: { type: DataTypes.INTEGER },
  completionStatus: { type: DataTypes.STRING, defaultValue: 'not started' }
}, { timestamps: true });

module.exports = Game;
