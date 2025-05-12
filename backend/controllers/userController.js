const bcrypt = require("bcryptjs");
const User = require("../models/users");

// Создание нового пользователя (только админ)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Необходимо заполнить все поля" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Пользователь уже существует" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: "Пользователь создан", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
};
