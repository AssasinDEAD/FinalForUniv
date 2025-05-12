const express = require("express");

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const resumeRoutes = require("./resumeRoutes");
const vacancyRoutes = require("./vacancyRoutes");
const vacancyResponseRoutes = require("./vacancyResponseRoutes");
const notificationRoutes = require("./notificationRoutes");
const aiChat = require("./aiChat");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/resumes", resumeRoutes);
router.use("/vacancies", vacancyRoutes);
router.use("/responses", vacancyResponseRoutes);
router.use("/notifications", notificationRoutes);
router.use("/aiChat", aiChat);

module.exports = router;
