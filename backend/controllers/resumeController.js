const { User, Resume } = require("../models");

exports.upsertResume = async (req, res) => {
    try {
        const { experience, skills, languages, additionalInfo } = req.body;
        const userId = req.user.id;

        const [resume, created] = await Resume.upsert(
            { userId, experience, skills, languages, additionalInfo },
            { conflictFields: ['userId'], returning: true } 
        );

        res.status(created ? 201 : 200).json({
            message: created ? "Резюме создано" : "Резюме обновлено",
            resume,
        });
    } catch (error) {
        console.error("Ошибка в upsertResume:", error);
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};


exports.getResume = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await Resume.findByPk(id, { include: User });

        if (!resume) {
            return res.status(404).json({ message: "Резюме не найдено" });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};


exports.getMyResume = async (req, res) => {
    try {
        
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "Ошибка: пользователь не найден в req.user" });
        }

        const resume = await Resume.findOne({ where: { userId } });

        if (!resume) {
            return res.status(404).json({ message: "Резюме не найдено" });
        }

        res.json(resume);
    } catch (error) {
        console.error("Ошибка при получении резюме:", error);
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
};


exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.findAll({ include: User });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};

exports.deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resume = await Resume.findOne({ where: { id, userId } });

        if (!resume) {
            return res.status(404).json({ message: "Резюме не найдено или у вас нет доступа" });
        }

        await resume.destroy();
        res.json({ message: "Резюме удалено" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};
