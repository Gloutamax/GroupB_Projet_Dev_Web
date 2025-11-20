const evaluatePasswordStrength = require('../routes/users').evaluatePasswordStrength;
const users = [];

module.exports = {
    getAllUsers: (req, res) => {
        res.json(users);
    },
    getUserById: (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const user = users.find((u) => u.id === userId);
        if (!user) {
            res.status(404).json({ error: "Utilisateur non trouvé." });
        } else {
            res.json("Utilisateur choisi : " + user.name);
            res.json(user);
        }
    },
    createUser: (req, res) => {
        const user_data = req.body;
        const err = {};
        const info = {}; 
        if (!user_data.name) {
            err.name = "Le champ nom est requis.";
        }
        if (!user_data.email) {
            err.email = "Le champ email est requis.";
        } else if (!/[a-z]+@[a-z]+\.[a-z]+/.test(user_data.email)) {
            err.email = "Le format de l'email est invalide.";
        }
        if (!user_data.password) {
            err.password = "Le champ mot de passe est requis.";
        } else {
            const passwordStrength = evaluatePasswordStrength(user_data.password);
            info.passwordStrength = `Force du mot de passe : ${passwordStrength}`;

            if (user_data.password.length < 6) {
                info.passwordWarning = "Il est recommandé d'utiliser un mot de passe d'au moins 6 caractères.";
            }
        }
        if (Object.keys(err).length > 0) {
            res.status(422).json(err);
        } else {
            const new_user = {
                ...user_data,
                id: Date.now(),
            };
            users.push(new_user);
            res.status(201).json({ message: "Utilisateur crée avec succès.", new_user, info });
        }
    },
    updateUser: (req, res) => {
        const User_Data = req.body;
        const userId = parseInt(req.params.id, 10);
        const user = users.find((u) => u.id === userId);
        if (!user) {
            res.status(404).json({ error: "Utilisateur non trouvé." });
        } else {
            err.login = "La valeur est requise.";
        }
        if (User_Data.email) {
            if (User_Data.email !== "") {
                if (User_Data.email !== "") {
                    err.email = "La valeur est requise.";
                } else if (!/[a-z]+@[a-z]+\.[a-z]+/.test(User_Data.email)) {
                    err.email = "Le format de l'email est invalide.";
                }
            }
        }
        if (User_Data.password && User_Data.password !== "") {
            err.password = "La valeur est requise.";
        }
        if (Object.keys(err).length > 0) {
            res.status(422).json(err);
        }
        Object.assign(user, User_Data);
        res.json({ message: "Utilisateur mis à jour avec succès.", user });
    },
    deleteUser: (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex === -1) {
            res.status(404).json({ error: "Utilisateur non trouvé." });
        }
        users.splice(userIndex, 1);
        res.json({ message: "Utilisateur supprimé avec succès." });
    }
};