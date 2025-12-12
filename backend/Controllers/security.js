const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email, 
            }
        });

        if (!user) {
            return res.status(401).json({ message: "Forbidden" });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Forbidden"});
        }

        // Créer le token avec username et role
        const token = jwt.sign(
            { 
                user_id: user.id,
                username: user.username,
                role: user.role 
            },
            process.env.JWT_SECRET ?? "MY_SECRET_KEY"
        );
        
        res.json({ token });
    },
};