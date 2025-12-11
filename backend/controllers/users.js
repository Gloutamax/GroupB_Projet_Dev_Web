const { evaluatePasswordStrength } = require('../utils/passwordValidator');
const User = require('../models/users');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        }
    },
    getUserById: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            
            // Vérifier si l'utilisateur est USER et tente d'accéder aux données d'un autre utilisateur
            if (req.user.role === 'USER' && req.user.id !== id) {
                return res.status(403).json({ error: "Accès interdit. Vous ne pouvez consulter que vos propres données." });
            }
            
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
            const user_data = req.body;
            const err = {};
            const info = {};

            // Validation des champs
            if (!user_data.username) {
                err.username = "Le champ nom d'utilisateur est requis.";
            }
            if (!user_data.email) {
                err.email = "Le champ email est requis.";
            } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(user_data.email)) {
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

            // Si des erreurs de validation existent, retourner 422
            if (Object.keys(err).length > 0) {
                return res.status(422).json(err);
            }

            const newUser = await User.create(user_data);
            res.status(201).json({ 
                message: "Utilisateur créé avec succès.", 
                user: newUser,
                info 
            });
        } catch (error) {
            console.error('Error creating user:', error);
            
            // Gestion des erreurs Sequelize
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(422).json({ email: "Cet email est déjà utilisé." });
            }
            if (error.name === 'SequelizeValidationError') {
                return res.status(422).json({ error: error.errors.map(e => e.message).join(', ') });
            }
            
            res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
        } 
    },
    updateUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            
            // Vérifier si l'utilisateur est USER et tente de modifier les données d'un autre utilisateur
            if (req.user.role === 'USER' && req.user.id !== id) {
                return res.status(403).json({ error: "Accès interdit. Vous ne pouvez modifier que vos propres données." });
            }
            
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
            const id = parseInt(req.params.id, 10);
            
            // Vérifier si l'utilisateur est USER et tente de supprimer un autre utilisateur
            if (req.user.role === 'USER' && req.user.id !== id) {
                return res.status(403).json({ error: "Accès interdit. Vous ne pouvez supprimer que votre propre compte." });
            }
            
            const nbDeleted = await User.destroy({ where: { id } });
            if (nbDeleted === 0) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            }
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
    signupUser: async (req, res, next) => {
        try {
            const user_data = req.body;
            const err = {};
            const info = {};

            // Validation des champs
            if (!user_data.username) {
                err.username = "Le champ nom d'utilisateur est requis.";
            }
            if (!user_data.email) {
                err.email = "Le champ email est requis.";
            } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(user_data.email)) {
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

            // Si des erreurs de validation existent, retourner 422
            if (Object.keys(err).length > 0) {
                return res.status(422).json(err);
            }

            // Forcer le rôle à USER et ignorer le rôle fourni dans la requête
            const safeUserData = {
                username: user_data.username,
                email: user_data.email,
                password: user_data.password,
                role: "USER" // Forcer le rôle à USER
            };

            const newUser = await User.create(safeUserData);
            res.status(201).json({ 
                message: "Inscription réussie.", 
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                },
                info 
            });
        } catch (error) {
            console.error('Error creating user:', error);
            
            // Gestion des erreurs Sequelize
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(422).json({ email: "Cet email est déjà utilisé." });
            }
            if (error.name === 'SequelizeValidationError') {
                return res.status(422).json({ error: error.errors.map(e => e.message).join(', ') });
            }
            
            res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        } 
    },
};