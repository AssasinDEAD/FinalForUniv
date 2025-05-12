const {VacancyResponse, Vacancy} = require("../models");

exports.createResponse = async (req, res) => {
  try {
    const { vacancyId, coverLetter } = req.body;
    const userId = req.user.id;

    const vacancy = await Vacancy.findByPk(vacancyId);
    if (!vacancy) return res.status(404).json({ message: "Вакансия не найдена" });

    const response = await VacancyResponse.create({
      vacancyId,
      userId,
      coverLetter,
    });
    res.status(201).json(response);
  } catch (error) {
    console.error("Ошибка при создании отклика:", error);
    res.status(500).json({ message: "Ошибка при создании отклика", error });
  }
};

exports.getMyResponses = async (req, res) => {
  try {
    const userId = req.user.id;

    const responses = await VacancyResponse.findAll({
      where: { userId },
      include: [{ model: Vacancy }],
    });

    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении откликов", error });
  }
};

exports.getResponsesByVacancy = async (req, res) => {
  try {
    const vacancyId = req.params.vacancyId;

    const responses = await VacancyResponse.findAll({
      where: { vacancyId },
      include: ["User"],
    });

    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении откликов", error });
  }
};


exports.updateResponseStatus = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Недопустимый статус" });
    }

    const response = await VacancyResponse.findByPk(responseId);
    if (!response) {
      return res.status(404).json({ message: "Отклик не найден" });
    }

    response.status = status;
    await response.save();

    res.json({ message: "Статус обновлён", response });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении статуса", error });
  }
};
