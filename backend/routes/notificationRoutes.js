const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // 👈 multer middleware

router.use(authMiddleware()); // Все маршруты только для авторизованных

router.get("/", notificationController.getAllNotifications);
router.get("/:id", notificationController.getNotificationById);

// Только для career_center: создание, редактирование, удаление
router.post("/", authMiddleware("career_center"), upload.single("image"), notificationController.createNotification);
router.put("/:id", authMiddleware("career_center"), upload.single("image"), notificationController.updateNotification);
router.delete("/:id", authMiddleware("career_center"), notificationController.deleteNotification);

module.exports = router;
