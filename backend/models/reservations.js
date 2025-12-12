const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");
const User = require("./users");
//! Besoin de dépendances vers Material

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    /*materielId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },*/
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    tableName: "reservations",
    underscored: true,
  }
);

//hooks
//! Besoin du hook pour materiel
Reservation.addHook("beforeCreate", async (reservation, options) => {
  const user = await User.findByPk(reservation.userId);
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }
});

module.exports = Reservation;
