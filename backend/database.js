const { Sequelize } = require('sequelize');
const path = require('path');

//defining our database configuration
const dbPath = path.join(__dirname, 'MBL-mail-inbox.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
});

module.exports = sequelize;