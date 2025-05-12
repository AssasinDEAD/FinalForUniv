const { DataTypes } = require("sequelize");
const db = require("../config/db");

const VacancyResponse = db.define("VacancyResponse", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    allowNull: false,
    defaultValue: "pending", 
  },
}, {
  tableName: "vacancy_responses",
  timestamps: true,
});

module.exports = VacancyResponse;
