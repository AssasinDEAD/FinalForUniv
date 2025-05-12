const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
}, {
  timestamps: true,
  updatedAt: "updated_at",
  createdAt: "created_at",
});

module.exports = Notification;
