const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("User", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.ENUM("student", "company", "career_center", "admin"),
    allowNull: false 
  },

  loginAttempts: { type: DataTypes.INTEGER, defaultValue: 0 }, 
  blockedUntil: { type: DataTypes.DATE, allowNull: true, defaultValue: null } 
 
});

module.exports = User;
