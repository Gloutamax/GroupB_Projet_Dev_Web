const express = require("express");
const app = express(); 
const { getConnection } = require("./lib/db");

app.use(express.json());

function logRequests(req, res, next) {
    console.log("Request received: ", req.method, req.url);
    next();
}
app.use(logRequests);

app.use((req, res, next) => {
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
        if (req.body === undefined) {
            return res.status(400).json({ error: "Missing JSON body" });
        }
    }
    next();
});

// Définition d'une route get par défaut
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to the material location website !" });
    const queryParams = req.query;
    console.log("Query params: ", queryParams);
    res.send(
        "Welcome to the material location website !" + JSON.stringify(queryParams)
    );
});

// Définition d'une route post par défaut
app.post("/", (req, res, next) => {
    const bodyParams = req.body;
    console.log("Body params: ", bodyParams);
    res.send("POST request recveived with body: " + JSON.stringify(bodyParams));
});

getConnection().then(() => {
    const userRouter = require("./routes/users");
    //TODO : Route pour les matériels a ajouter ici
    //TODO : Route pour les réservations a ajouter ici
    //TODO : Route pour le suivi d'usage a ajouter ici

    app.use(userRouter);
    //TODO : Utilisation de la route pour les matériels a ajouter ici
    //TODO : Utilisation de la route pour les réservations a ajouter ici
    //TODO : Utilisation de la route pour le suivi d'usage a ajouter ici

    app.listen(3000, () => {
    console.log("Server listening on port 3000");
    });
});