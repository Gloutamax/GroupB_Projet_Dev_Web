const { Router } = require('express'); 
const router = Router();
const UserController = require('../controllers/users');

// Fonction pour évaluer la force du mot de passe
module.exports.evaluatePasswordStrength = (password) => {
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    if (length < 6) {
        return "faible";
    } else if (length >= 6 && !hasNumbers && !hasSymbols) {
        return "moyen";
    } else if (length >= 6 && hasNumbers && !hasSymbols) {
        return "fort";
    } else if (length >= 6 && hasNumbers && hasSymbols) {
        return "très fort";
    }
    return "moyen"; // Cas par défaut
};

// Affichage de tous les utilisateurs 
router.get('/users', UserController.getAllUsers); 

// Gestion de la création d'un utilisateur
router.post('/users', UserController.createUser);

// Affichage d'un utilisateur par ID
router.get('/users/:id', UserController.getUserById);

// Mise à jour d'un utilisateur par ID
router.patch('/users/:id', UserController.updateUser);

// Suppression d'un utilisateur par ID
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;