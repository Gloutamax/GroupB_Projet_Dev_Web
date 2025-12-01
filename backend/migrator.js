const { getConnection } = require('./lib/db');

getConnection()
    .then(async (connection) => {
        // On importe les modèles ici
        const User = require('./models/users');
        // TODO : Importer les autres modèles ici pour la synchronisation des autres tables
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
    })