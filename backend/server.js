const express = require("express");
const app = express();
const materielController = require("./Controllers/materiel");
const { getConnection } = require("./lib/db");

app.use(express.json());

// Routes CRUD
app.get("/materiel", materielController.cget);
app.post("/materiel", materielController.create);
app.get("/materiel/:id", materielController.get);
app.patch("/materiel/:id", materielController.patch);
app.delete("/materiel/:id", materielController.delete);

// Connexion DB + démarrage serveur
getConnection().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
