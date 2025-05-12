const Notification = require("../models/cc/notification");
const fs = require("fs");
const path = require("path");

// Получить все оповещения
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ order: [["created_at", "DESC"]] });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при загрузке оповещений" });
  }
};

// Создать оповещение с изображением
exports.createNotification = async (req, res) => {
  const { title, content } = req.body;

  if (req.user.role !== "career_center") {
    return res.status(403).json({ error: "Нет прав на создание оповещений" });
  }

  try {

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const notification = await Notification.create({ title, content, imageUrl });

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при создании оповещения" });
  }
};


exports.updateNotification = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (req.user.role !== "career_center") {
    return res.status(403).json({ error: "Нет прав на обновление" });
  }

  try {
    const notification = await Notification.findByPk(id);
    if (!notification) return res.status(404).json({ error: "Оповещение не найдено" });

    notification.title = title;
    notification.content = content;

    if (req.file) {
      // Удалить старое изображение, если оно есть
      if (notification.imageUrl) {
        const oldImagePath = path.join(__dirname, "..", notification.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Ошибка при удалении старого изображения:", err.message);
          }
        });
      }

      // Установить новое изображение
      notification.imageUrl = `/uploads/${req.file.filename}`;
    }

    await notification.save();

    res.json(notification);
  } catch (err) {
    console.error("Ошибка при обновлении:", err.message);
    res.status(500).json({ error: "Ошибка при обновлении оповещения" });
  }
};



// Удалить оповещение
exports.deleteNotification = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "career_center") {
    return res.status(403).json({ error: "Нет прав на удаление" });
  }

  try {
    const notification = await Notification.findByPk(id);
    if (!notification) return res.status(404).json({ error: "Оповещение не найдено" });

    // Удаление изображения, если есть
    if (notification.imageUrl) {
      const imagePath = path.join(__dirname, "..", notification.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Ошибка при удалении изображения:", err.message);
          // Не блокируем удаление оповещения из-за ошибки удаления файла
        }
      });
    }

    await notification.destroy();
    res.json({ message: "Оповещение и изображение удалены" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при удалении оповещения" });
  }
};


// Получить одно оповещение по ID
exports.getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ error: "Оповещение не найдено" });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении оповещения" });
  }
};
