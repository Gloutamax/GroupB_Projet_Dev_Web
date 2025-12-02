const express = require("express");
const app = express();
const { getConnection } = require("./lib/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour parser application/x-www-form-urlencoded

function logRequests(req, res, next) {
  console.log("Request received: ", req.method, req.url);
  next();
}
app.use(logRequests);

app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    // Vérifier si le body est vide uniquement pour JSON
    if (req.is("application/json") && Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Missing JSON body" });
    }
  }
  next();
});

// Définition d'une route get par défaut
app.get("/", (req, res, next) => {
  const queryParams = req.query;
  console.log("Query params: ", queryParams);
  res.json({
    message: "Welcome to the material location website !",
    queryParams,
  });
});

// Définition d'une route post par défaut
app.post("/", (req, res, next) => {
  const bodyParams = req.body;
  const contentType = req.get("Content-Type");
  console.log("Body params: ", bodyParams);
  console.log("Content-Type: ", contentType);

  // Pour XML, le body ne sera pas parsé automatiquement
  if (contentType && contentType.includes("application/xml")) {
    return res.send(
      "POST request received with XML (not parsed): " + JSON.stringify(req.body)
    );
  }

  res.send("POST request received with body: " + JSON.stringify(bodyParams));
});

getConnection()
  .then(async () => {
    const userRouter = require("./routes/users");
    //TODO : Route pour les matériels a ajouter ici
    const userReservation = require("./routes/reservation");
    //TODO : Route pour le suivi d'usage a ajouter ici

    app.use(userRouter);
    //TODO : Utilisation de la route pour les matériels a ajouter ici
    app.use(userReservation);
    //TODO : Utilisation de la route pour le suivi d'usage a ajouter ici

    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });

// Middleware de gestion d'erreur global (doit être après toutes les routes)
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({ error: "Une erreur interne est survenue" });
});
