const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

//Creating Message Model
const Message = sequelize.define('Message', {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

//Defining relation with User model
Message.belongsTo(User);
module.exports = Message;