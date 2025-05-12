'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.fn("uuid_generate_v4"), primaryKey: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      role: {
        type: Sequelize.ENUM("student", "company", "career_center", "admin"),
        allowNull: false,
      },
      loginAttempts: { type: Sequelize.INTEGER, defaultValue: 0 },
      blockedUntil: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  
  down: async (queryInterface) => {
    await queryInterface.dropTable("Users");
  },
};

