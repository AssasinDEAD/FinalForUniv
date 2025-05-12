const express = require("express");
const router = express.Router();
const aiChatController = require("../controllers/aiChatController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware("student"), aiChatController.handleAIChat );

module.exports = router;
