const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/vacancyResponseController");

router.post("/", auth(), controller.createResponse);
router.get("/my", auth(), controller.getMyResponses);
router.get("/vacancy/:vacancyId", auth(), controller.getResponsesByVacancy);
router.put("/:responseId/status", auth(), controller.updateResponseStatus);

module.exports = router;
