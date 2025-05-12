'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Resumes", {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.fn("uuid_generate_v4"), primaryKey: true },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      experience: { type: Sequelize.ARRAY(Sequelize.JSONB), allowNull: true },
      skills: { type: Sequelize.ARRAY(Sequelize.JSONB), allowNull: false },
      languages: { type: Sequelize.ARRAY(Sequelize.JSONB), allowNull: false },
      additionalInfo: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Resumes");
  },
};

