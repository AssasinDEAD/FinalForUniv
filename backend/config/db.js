const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
});

db.authenticate()
    .then(() => console.log("PostgreSQL connected"))
    .catch(err => console.error("Database connection error:", err));


db.sync({ force: false }) // { force: true }, если нужно пересоздать таблицу
    .then(() => console.log("Database & tables synced!"))
    .catch((err) => console.error("Error syncing database:", err));
    


module.exports = db;
