const User = require("./user");
const Reservation = require("./reservation");

// Associations
User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Reservation };
