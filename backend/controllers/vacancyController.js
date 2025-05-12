const { Vacancy, User }= require("../models");

exports.createVacancy = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Доступ запрещен: только для компаний" });
    }

    const { title, description, requirements, location, salary } = req.body;

    const vacancy = await Vacancy.create({
      title,
      description,
      requirements,
      location,
      salary,
      userId: req.user.id,
    });

    res.status(201).json(vacancy);
  } catch (error) {
    console.error("Ошибка при создании вакансии:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll({
      include: { model: User, attributes: ["id", "name", "email"] },
      order: [["createdAt", "DESC"]],
    });
    res.json(vacancies);
  } catch (error) {
    console.error("Ошибка при получении списка вакансий:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id, {
      include: { model: User, attributes: ["id", "name", "email"] },
    });

    if (!vacancy) {
      return res.status(404).json({ message: "Вакансия не найдена" });
    }

    res.json(vacancy);
  } catch (error) {
    console.error("Ошибка при получении вакансии:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ message: "Вакансия не найдена" });
    }

    if (vacancy.userId !== req.user.id) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }

    await vacancy.update(req.body);
    res.json(vacancy);
  } catch (error) {
    console.error("Ошибка при обновлении вакансии:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ message: "Вакансия не найдена" });
    }

    if (vacancy.userId !== req.user.id) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }

    await vacancy.destroy();
    res.json({ message: "Вакансия удалена" });
  } catch (error) {
    console.error("Ошибка при удалении вакансии:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};


exports.getMyVacancies = async (req, res) => {
  try {
    const userId = req.user.id; 
    const role = req.user.role;

    if (role !== "company") {
      return res.status(403).json({ message: "Доступ запрещен" });
    }

    const vacancies = await Vacancy.findAll({ where: { userId: userId } });
    res.json(vacancies);
  } catch (error) {
    console.error("Ошибка при получении вакансий компании", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
