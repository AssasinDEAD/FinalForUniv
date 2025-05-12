const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/me", authMiddleware("student"), resumeController.getMyResume);
router.get("/", authMiddleware(), resumeController.getResumes);

router.get("/:id", authMiddleware(), resumeController.getResume);
router.put("/", authMiddleware("student"), resumeController.upsertResume); 
router.delete("/:id", authMiddleware("student"), resumeController.deleteResume);

module.exports = router;
