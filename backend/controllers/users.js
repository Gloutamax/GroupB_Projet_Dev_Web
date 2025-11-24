const evaluatePasswordStrength = require('../routes/users').evaluatePasswordStrength;
const DB = require('../lib/db');

const getUser = async () => {
    const connection = await DB.getConnection();
    return connection.models.User;
};

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const User = await getUser();
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        }
    },
    getUserById: async (req, res) => {
        try {
            const User = await getUser();
            const id = parseInt(req.params.id, 10);
            const foundUser = await User.findByPk(id);
            if (!foundUser) {
                res.status(404).json({ error: "Utilisateur non trouvé." });
            } else {
                res.json(foundUser);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
        }
    },
    createUser: async (req, res, next) => {
        try {
            const User = await getUser();
            res.status(201).json(await User.create(req.body));
        } catch (error) {
            next(error);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const User = await getUser();
            const id = parseInt(req.params.id, 10);
            const [nbUpdated, [user]] = await User.update(req.body, {
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
        try {
            const User = await getUser();
            const id = parseInt(req.params.id, 10);
            const nbDeleted = await User.destroy({ where: { id } });
            if (nbDeleted === 0) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            }
            return res.json({ message: "Utilisateur supprimé avec succès." });
        } catch (error) {
            next(error);
        }
    }
};