const express = require("express");
const app = express();
const materielController = require("./Controllers/materiel"); // chemin en minuscules

app.use(express.json());

// Routes CRUD
app.get("/materiel", materielController.cget);              // GET all
app.post("/materiel", materielController.create);           // POST create
app.get("/materiel/:id", materielController.get);           // GET one by id
app.patch("/materiel/:id", materielController.patch);       // PATCH update
app.delete("/materiel/:id", materielController.delete);     // DELETE one

// Démarrage du serveur
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
