const jwt = require("jsonwebtoken");

module.exports = (requiredRole = null) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Нет доступа" });
        }

        const token = authHeader.split(" ")[1]; 
        console.log("token");
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: "Доступ запрещен" });
            }
            console.log("req.user");
            next();
        } catch (error) {
            console.error("error");
            return res.status(401).json({ message: "Токен недействителен или истёк" });
        }
    };
};
