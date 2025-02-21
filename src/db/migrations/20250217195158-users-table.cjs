'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(120),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
