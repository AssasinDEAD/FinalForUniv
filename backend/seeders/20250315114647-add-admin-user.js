'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(`SELECT COUNT(*) FROM "Users"`);
    const count = parseInt(users[0][0].count, 10);

    if (count === 0) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await queryInterface.bulkInsert("Users", [
        {
          id: "b3b7d7b3-d3d7-4d7b-b3b7-d3d7b7d3b7d7",
          email: "admin@example.com",
          password: hashedPassword,
          name: "Admin",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", { email: "admin@example.com" });
  },
};
