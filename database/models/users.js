const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { timestamps: true });

module.exports = User;
