const { Router } = require('express'); 
const router = Router();
const UserController = require('../controllers/users');

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