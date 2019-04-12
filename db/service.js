const Sequelize = require('sequelize');
const config = require('../config');

module.exports = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging && console.log,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports.Sequelize = Sequelize;
