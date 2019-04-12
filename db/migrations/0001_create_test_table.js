module.exports = {
  up: function (q, Sequelize) {
    return q.createTable('test', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      first: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      second: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      third: {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    });
  },
  down: function (q, Sequelize) {
    return q.dropTable('test');
  }
};
