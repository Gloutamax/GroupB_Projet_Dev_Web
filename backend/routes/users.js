const { Router } = require('express'); 
const router = Router();
const UserController = require('../controllers/users');
const checkAuth = require('../middlewares/check-auth');
const checkRole = require('../middlewares/check-role');

// Route publique pour l'inscription (sans authentification)
router.post('/signup', UserController.signupUser);

// Affichage de tous les utilisateurs 
router.get('/users', checkAuth, checkRole(["ADMIN"]), UserController.getAllUsers); 

// Gestion de la création d'un utilisateur (réservé aux admins)
router.post('/users', checkAuth, checkRole(["ADMIN"]), UserController.createUser);

// Affichage d'un utilisateur par ID
router.get(
    '/users/:id', 
    checkAuth, 
    checkRole(["ADMIN", "USER"]),
    UserController.getUserById
);

// Mise à jour d'un utilisateur par ID
router.patch(
    '/users/:id', 
    checkAuth,
    checkRole(["ADMIN", "USER"]),
    UserController.updateUser
);

// Suppression d'un utilisateur par ID
router.delete(
    '/users/:id',
    checkAuth, 
    checkRole(["ADMIN", "USER"]), 
    UserController.deleteUser
);

module.exports = router;