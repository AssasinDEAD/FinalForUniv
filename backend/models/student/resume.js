const { DataTypes } = require("sequelize");
const db = require("../../config/db");
const User = require("../users");

const Resume = db.define("Resume", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    experience: {
        type: DataTypes.ARRAY(DataTypes.JSONB), 
        allowNull: true,
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.JSONB), 
        allowNull: false,
    },
    languages: {
        type: DataTypes.ARRAY(DataTypes.JSONB), 
        allowNull: false,
    },
    additionalInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Resume.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasOne(Resume, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Resume;