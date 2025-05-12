const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/newUser", authMiddleware("admin"), userController.createUser);

module.exports = router;
