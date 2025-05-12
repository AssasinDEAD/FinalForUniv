const express = require("express");
const router = express.Router();
const vacancyController = require("../controllers/vacancyController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware("company"), vacancyController.createVacancy);
router.get("/my", authMiddleware("company"), vacancyController.getMyVacancies);
router.get("/", authMiddleware(), vacancyController.getVacancies);
router.get("/:id", authMiddleware(), vacancyController.getVacancy);
router.put("/:id", authMiddleware("company"), vacancyController.updateVacancy);
router.delete("/:id", authMiddleware("company"), vacancyController.deleteVacancy);

module.exports = router;
