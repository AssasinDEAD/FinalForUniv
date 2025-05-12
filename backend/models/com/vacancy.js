const { DataTypes } = require("sequelize");
const db = require("../../config/db");
const User = require("../users");

const Vacancy = db.define("Vacancy", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    },
    onDelete: "CASCADE"
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  requirements: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  location: { type: DataTypes.STRING, allowNull: true },
  salary: { type: DataTypes.STRING, allowNull: true },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Vacancy;
