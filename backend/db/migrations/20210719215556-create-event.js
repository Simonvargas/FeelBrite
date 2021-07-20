'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hostId: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER(50),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};