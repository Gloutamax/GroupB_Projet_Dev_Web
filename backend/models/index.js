const User = require("./users");
const Reservation = require("./reservations");
const Materiel = require("./materiel");

// Associations
User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });
Materiel.hasMany(Reservation, { foreignKey: "materielId" });
Reservation.belongsTo(Materiel, { foreignKey: "materielId" });

module.exports = { User, Reservation, Materiel };
