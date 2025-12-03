const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Review = sequelize.define('Review', {
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 10 } },
  comment: { type: DataTypes.TEXT }
}, { timestamps: true });

module.exports = Review;
