const evaluatePasswordStrength = require('../routes/users').evaluatePasswordStrength;
const user = require('../models/users');

module.exports = {
    getAllUsers: async (req, res) => {
        res.json(await user.findAll());
    },
    getUserById: async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const foundUser = await user.findByPk(id);
        if (!foundUser) {
            res.status(404).json({ error: "Utilisateur non trouvé." });
        } else {
            res.json(foundUser);
        }
    },
    createUser: async (req, res, next) => {
        try {
            res.status(201).json(await user.create(req.body));
        } catch (error) {
            next(error);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [nbUpdated, [user]] = await user.update(req.body, {
                where: { id },
                returning: true,
                individualHooks: true,
            });
            if (nbUpdated === 0) {
               return res.status(404).json({ error: "Utilisateur non trouvé." });
            }

            return res.json(user);
        } catch (error) {
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        try {
            const nbDeleted = await user.destroy({ where: { id } });
            if (nbDeleted === 0) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            }
            return res.json({ message: "Utilisateur supprimé avec succès." });
        } catch (error) {
            next(error);
        }
    }
};