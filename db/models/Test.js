const db = require('../service');

const Test = db.define('test', {
  createdAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  updatedAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  first: {
    type: db.Sequelize.BIGINT,
    allowNull: false
  },
  second: {
    type: db.Sequelize.BIGINT,
    allowNull: false
  },
  third: {
    type: db.Sequelize.BIGINT,
    allowNull: false
  }
}, {
  tableName: 'test',
  freezeTableName: true,
  name: {
    singular: 'test'
  }
});

module.exports = Test;
