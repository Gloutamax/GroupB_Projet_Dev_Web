const { Router } = require('express'); 

const router = Router();

// Création d'un tableau temporaire pour gérer les utilisateur --> a gérer plus tard avec une base de données
const users = [];

// Fonction pour évaluer la force du mot de passe
const evaluatePasswordStrength = (password) => {
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
router.get('/user', (req, res, next) => {
    res.json(users);
});

// Gestion de la création d'un utilisateur
router.post('/user', (req, res, next) => {
    const user_data = req.body; 
    const err = {};
    const info = {}; // Objet supplémentaire pour afficher des messages d'info à l'utilisateur
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
        users.push(new_user); // Correction: users au lieu de user_data
        res.status(201).json({ message: "Utilisateur crée avec succès.", new_user, info });
    }
})

router.get('/users/:id', (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé." });
    } else {
        res.json("Utilisateur choisi : " + user.name);
        res.json(user);
    }
});

router.patch('/user/:id', (req, res, next) => {
    const User_Data = req.body;
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    if (User_Data.login && User_Data.login !== user.login) {
        err.login = "La valeur est requise.";
    }
    if (User_Data.email) {
        if (User_Data.email !== "") {
            err.email = "La valeur est requise.";
        } else if (!/[a-z]+@[a-z]+\.[a-z]+/.test(User_Data.email)) {
            err.email = "Le format de l'email est invalide.";
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
});

router.delete('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10); 
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    users.splice(userIndex, 1);
    res.json({ message: "Utilisateur supprimé avec succès." });
});

module.exports = router;