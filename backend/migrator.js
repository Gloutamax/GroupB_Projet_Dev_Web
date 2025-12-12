const { getConnection } = require("./lib/db");

getConnection()
  .then(async (connection) => {
    // On importe les modèles ici
    const User = require("./models/users");
    const Reservation = require("./models/reservations");
    const Material = require("./models/materiel");
    return connection;
  })
  .then((connection) =>
    connection.sync({
      alter: true,
    })
  )
  .then((connection) => connection.close())
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });